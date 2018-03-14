const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
const { GQC } = require('graphql-compose');

/**
* Mongoose Models
*/
const User = keystone.list('User').model;
const Poll = keystone.list('Poll').model;
const PollVote = keystone.list('PollVote').model;
const LocalGovernment = keystone.list('LocalGovernment').model;
const State = keystone.list('State').model;
const Candidate = keystone.list('Candidate').model;
const JobExperience = keystone.list('JobExperience').model;

/**
* Config
*/
const UserTCOptions = {
  fields:{
    remove: ['password', 'passwordVersion','isAdmin']
  }
};
const CandidateTCOptions = {
  fields:{
    remove: ['password', 'passwordVersion', 'isVerified', 'isEmployed', 'documentsUploaded', 'caseFile']
  },
  resolvers:{
    updateById: {
      record: {
        removeFields: ['phone', 'result', 'category', 'password', 'passwordVersion', 'isVerified', 'isEmployed', 'documentsUploaded', 'caseFile']
      }
    }
  }
};

/**
* Exports
*/
const UserTC = exports.UserTC = composeWithMongoose(User, UserTCOptions);
const PollTC = exports.PollTC = composeWithMongoose(Poll);
const PollVoteTC = exports.PollVoteTC = composeWithMongoose(PollVote);
const LocalGovernmentTC = exports.LocalGovernmentTC = composeWithMongoose(LocalGovernment);
const StateTC = exports.StateTC = composeWithMongoose(State);
const JobExperienceTC = exports.JobExperienceTC = composeWithMongoose(JobExperience);
const CandidateTC = exports.CandidateTC = composeWithMongoose(Candidate, CandidateTCOptions);
//const CandidateUserTC = composeWithMongoose(Candidate, CandidateUserTCOptions);

/**
* Add JWT to user models for login
*/
UserTC.addFields({jwt: 'String', id: 'String'})
CandidateTC.addFields({jwt: 'String', id: 'String'})

/**
* Relationships
*/


/**
* Viewer Fields for authentication and authorization
*/

//Viewer Types for restricted data access
const ViewerTC = exports.ViewerTC = GQC.getOrCreateTC('Viewer');
ViewerTC.addResolver({
	kind: 'query',
  name: 'adminAccess',
  type: ViewerTC,
  resolve: ({ args, context , contextUser}) => {
		console.log('this user');
    return { user: contextUser }
  },
})

const ViewerTCfields = {
	user: UserTC.getType()
}
ViewerTC.addFields(ViewerTCfields);

const ViewerCandidateTC = exports.ViewerCandidateTC = GQC.getOrCreateTC('ViewerCandidate');
ViewerCandidateTC.addResolver({
	kind: 'query',
  name: 'candidateAccess',
  type: ViewerCandidateTC,
  resolve: ({ args, context , contextCandidate}) => {
		console.log('this outlet');
		contextCandidate.id = contextCandidate._id;
    return { candidate: contextCandidate }
  },
})

const ViewerCandidateTCFields = {
	candidate: CandidateTC.getType()
	//add other exclusive to candidate fields here
}
ViewerCandidateTC.addFields(ViewerCandidateTCFields);
