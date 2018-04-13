/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const keystone = require('keystone');
const { GQC } = require('graphql-compose');

const typeComposers = require('./composers');
const addRelationships = require('./relationships');
const addResolvers = require('./resolvers');
const addViewers = require('./viewers');

//Get logic middleware
const {
	authAccess,
	updateSelf,
	createSelfRelationship,
	updateSelfRelationship,
	deleteSelfRelationship
} = require('./logic/common');

const {
	UserTC,
	PollTC,
	PollVoteTC,
	LocalGovernmentTC,
	StateTC,
  CandidateTC,
	ViewerCandidateTC,
	JobExperienceTC,
	CompanyTC,
	ViewerCompanyTC
} = typeComposers;

//Add relationships and resolvers to schema
addViewers();
addRelationships();
addResolvers();

//Add fields and resolvers to rootQuery
GQC.rootQuery().addFields({
	user: UserTC.get('$findOne'),
	...authAccess('Candidate', {
		viewerCandidate: ViewerCandidateTC.get('$candidateAccess')
	}),
	...authAccess('Company', {
		viewerCompany: ViewerCompanyTC.get('$companyAccess')
	}),
	currentTime: {
    type: 'Date',
    resolve: () => new Date().toISOString(),
  },
});

//Add fields and resolvers to rootQuery
GQC.rootMutation().addFields({
	user: UserTC.get('$removeById'),
	loginCandidate: CandidateTC.get('$loginWithPhone'),
	signUpCandidate: CandidateTC.get('$signUp'),
	loginCompany: CompanyTC.get('$loginWithEmail'),
	...authAccess('Candidate', {
		candidateUpdateById:updateSelf(CandidateTC),
		addJobExperience: createSelfRelationship( 'experience', JobExperienceTC),
		updateJobExperience: updateSelfRelationship( 'experience', JobExperienceTC),
		deleteJobExperience: deleteSelfRelationship( 'experience', JobExperienceTC),
		// addJobExperience: createAndUpdateCandidate( 'experience', JobExperienceTC),
		// updateJobExperience: updateCandidateRelationshipField( 'experience', JobExperienceTC),
		// addJobExperience: createAndUpdateCandidate( 'experience', JobExperienceTC),
		// updateJobExperience: updateCandidateRelationshipField( 'experience', JobExperienceTC),
		// addJobExperience: createAndUpdateCandidate( 'experience', JobExperienceTC),
		// updateJobExperience: updateCandidateRelationshipField( 'experience', JobExperienceTC),
	}),
	// ...authAccess('Candidate', {
	// 	candidateUpdateById:updateSelf(CandidateTC),
	// 	addJobExperience: createSelfRelationship( 'experience', JobExperienceTC),
	// 	updateJobExperience: updateSelfRelationship( 'experience', JobExperienceTC),
	// 	deleteJobExperience: deleteSelfRelationship( 'experience', JobExperienceTC),
	// 	// addJobExperience: createAndUpdateCandidate( 'experience', JobExperienceTC),
	// 	// updateJobExperience: updateCandidateRelationshipField( 'experience', JobExperienceTC),
	// 	// addJobExperience: createAndUpdateCandidate( 'experience', JobExperienceTC),
	// 	// updateJobExperience: updateCandidateRelationshipField( 'experience', JobExperienceTC),
	// 	// addJobExperience: createAndUpdateCandidate( 'experience', JobExperienceTC),
	// 	// updateJobExperience: updateCandidateRelationshipField( 'experience', JobExperienceTC),
	// }),
});

const schema = GQC.buildSchema();
module.exports = schema;

/*
var fs = require('fs');
fs.writeFile("./graphql/schema.txt", JSON.stringify(schema, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("\nThe schema was saved to schema.json!");
});
*/
