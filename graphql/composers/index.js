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
const Education = keystone.list('Education').model;
const Company = keystone.list('Company').model;
const Certificate = keystone.list('Certificate').model;
const Referee = keystone.list('Referee').model;

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
const CompanyTCOptions = {
  fields:{
    remove: ['password', 'passwordVersion','createdAt', 'createdBy', 'updatedAt', 'updatedBy']
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
const EducationTC = exports.EducationTC = composeWithMongoose(Education);
const CertificateTC = exports.CertificateTC = composeWithMongoose(Certificate);
const RefereeTC = exports.RefereeTC = composeWithMongoose(Referee);
const CandidateTC = exports.CandidateTC = composeWithMongoose(Candidate, CandidateTCOptions);
const CompanyTC = exports.CompanyTC = composeWithMongoose(Company, CompanyTCOptions);

/**
* Add JWT to user models for login
*/
UserTC.addFields({jwt: 'String', id: 'String'})
CandidateTC.addFields({jwt: 'String', id: 'String'})
CompanyTC.addFields({jwt: 'String'})


/**
* Viewer Fields for authentication and authorization
*/
const ViewerCandidateTC = exports.ViewerCandidateTC = GQC.getOrCreateTC('ViewerCandidate');
const ViewerCompanyTC = exports.ViewerCompanyTC = GQC.getOrCreateTC('ViewerCompany');
