const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
const { GQC } = require('graphql-compose');

const User = keystone.list('User').model;
const Poll = keystone.list('Poll').model;
const PollVote = keystone.list('PollVote').model;
const LocalGovernment = keystone.list('LocalGovernment').model;
const State = keystone.list('State').model;
const Candidate = keystone.list('Candidate').model;

const UserTCOptions = {
  fields:{
    remove: ['password','isAdmin']
  }
};

const UserTC = composeWithMongoose(User, UserTCOptions);
const PollTC = composeWithMongoose(Poll, {});
const PollVoteTC = composeWithMongoose(PollVote, {});
const LocalGovernmentTC = composeWithMongoose(LocalGovernment, {});
const StateTC = composeWithMongoose(State, {});
const OutletTC = composeWithMongoose(Outlet, {});
const CandidateTC = composeWithMongoose(Candidate, {});

/**
* Add JWT to user models for login
*/
UserTC.addFields({jwt: 'String'})
OutletTC.addFields({jwt: 'String'})
CandidateTC.addFields({jwt: 'String'})

/**
* Relationships
*/
PollTC.addRelation('votes', {
    resolver: () => PollVoteTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.votes,
    },
    projection: { votes: true }, // point fields in source object, which should be fetched from DB
  }
);

StateTC.addRelation('locals', {
    resolver: () => LocalGovernmentTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.locals,
    },
    projection: { locals: true }, // point fields in source object, which should be fetched from DB
  }
);

/**
* Viewer Fields for authentication and authorization
*/

//Viewer Types for restricted data access
const ViewerTC = GQC.getOrCreateTC('Viewer');
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

const OutletViewerTC = GQC.getOrCreateTC('OutletViewer');
OutletViewerTC.addResolver({
	kind: 'query',
  name: 'outletAccess',
  type: OutletViewerTC,
  resolve: ({ args, context , contextOutlet}) => {
		console.log('this outlet');
		//console.log(context.user);
    return { outlet: contextOutlet }
  },
})

const OutletViewerTCFields = {
	outlet: OutletTC.getType()
	//add other exclusive to outlet fields here
}
OutletViewerTC.addFields(OutletViewerTCFields);

const ViewerCandidateTC = GQC.getOrCreateTC('ViewerCandidate');
ViewerCandidateTC.addResolver({
	kind: 'query',
  name: 'candidateAccess',
  type: ViewerCandidateTC,
  resolve: ({ args, context , contextCandidate}) => {
		console.log('this outlet');
		//console.log(context.user);
    return { candidate: contextCandidate }
  },
})

const ViewerCandidateTCFields = {
	candidate: CandidateTC.getType()
	//add other exclusive to outlet fields here
}
ViewerCandidateTC.addFields(ViewerCandidateTCFields);

/**
* === Exports ===
*/
module.exports = {
  UserTC, EventTC, PollTC, PollVoteTC, NewsTC,
  PollingCenterTC, WardTC, LocalGovernmentTC, StateTC,
  OutletTC, CandidateTC,
  ViewerTC, OutletViewerTC, ViewerCandidateTC
};
