/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const keystone = require('keystone');
const { GQC } = require('graphql-compose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = keystone.list('User').model;
const Candidate = keystone.list('Candidate').model;
const typeComposers = require('./composers');
const addRelationships = require('./relationships');

const {
	UserTC, PollTC, PollVoteTC, LocalGovernmentTC, StateTC,
  CandidateTC, ViewerTC, ViewerCandidateTC, JobExperienceTC
} = typeComposers;
//Add relationships to schema
addRelationships();

const createAndUpdateCandidate = ( field, TC ) => {
	return TC.get('$createOne').wrapResolve(next => async (rp) => {
		//get contextCandidate from resolveParams (rp)
		const { contextCandidate } = rp
		const _field = contextCandidate[field]
		if (Array.isArray(_field)) {
			//add field to db and get result of createOne resolver
			const result = await next(rp);
			contextCandidate[field].push(result.recordId);
			try {
				await contextCandidate.save();
				return result;
			} catch (e) {
				//Placeholder function to stop the field from saving to the db
				result.record.remove().exec();
				return Promise.reject(`Unexpected error adding the document to candidate`);
			}
		} else {
			return Promise.reject(`Field: ${field} is not an collection field`);
		}
	});
}

//Add fields and resolvers to rootQuery
GQC.rootQuery().addFields({
	...adminAccess({
		viewer: ViewerTC.get('$adminAccess'),
	}),
	...candidateAccess({
		viewerCandidate: ViewerCandidateTC.get('$candidateAccess')
	}),
	currentTime: {
    type: 'Date',
    resolve: () => Date.now(),
  },
	stateMany: StateTC.get('$findMany'),
	// pollById: PollTC.get('$findById'),
	// pollByIds: PollTC.get('$findByIds'),
	// pollOne: PollTC.get('$findOne'),
	// pollMany: PollTC.get('$findMany'),
	// pollTotal: PollTC.get('$count'),
});

GQC.rootMutation().addFields({
	//userCreate: UserTC.get('$createOne'),
	/*login: {
		type: UserTC.getType(),
    description: 'login a user',
		args: {email: 'String', password: 'String'},
    resolve: (_,  args, context ) => {
			console.log('login this ----');
			const { email, password} = args;
			//console.log(context);
			return User.findOne({email}).then((user) => {
        if (user) {
          // validate password
					//return user;
          return bcrypt.compare(password, user.password).then((res) => {
            if (res) {
              // create jwt
							console.log('res');
              const token = jwt.sign({
                id: user.id,
                email: user.email,
								version: user.version,
              }, process.env.JWT_SECRET);
              user.jwt = token;
              context.user = Promise.resolve(user);
              return user;
            }
            return Promise.reject('password incorrect');
          });
        }
        return Promise.reject('email not found');
      });
		},
	},*/
	loginCandidate: {
		type: CandidateTC.getType(),
    description: 'login a candidate',
		args: {phone: 'String', password: 'String'},
    resolve: (_,  args, context ) => {
			console.log('candidate login this ----');
			const { phone, password } = args;
			//console.log(context);
			return Candidate.findOne({phone}).then((candidate) => {
        if (candidate) {
          // validate password
          return bcrypt.compare(password, candidate.password).then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign({
                id: candidate.id,
                //email: candidate.email,
								phone: candidate.phone,
								type: 'Candidate',
								//passwordVersion: candidate.passwordVersion,
              }, process.env.JWT_SECRET);
              candidate.jwt = token;
              context.candidate = Promise.resolve(candidate);
              return candidate;
            }
            return Promise.reject('password incorrect');
          });
        }
        return Promise.reject('phone/candidate not found');
      });
		},
	},
	...candidateAccess({
		candidateUpdateById: CandidateTC.get('$updateById'),
		addJobExperience: createAndUpdateCandidate( 'experience', JobExperienceTC)
		// addJobExperience: createAndUpdateCandidate( 'education', JobExperienceTC)
		// addJobExperience: createAndUpdateCandidate( 'certificates', JobExperienceTC)
		// addJobExperience: createAndUpdateCandidate( 'experience', JobExperienceTC)
	}),
	stateCreate: StateTC.get('$createOne'),
  // userUpdateById: UserTC.get('$updateById'),
  //userRemoveById: UserTC.get('$removeById'),
  //userRemoveOne: UserTC.get('$removeOne'),
  //userRemoveMany: UserTC.get('$removeMany'),
});

function adminAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => async (rp) => {
      //const { source, args, context, info } = resolveParams = rp
			try {
				const user = await rp.context.user;
				if (!user){
					console.log('Unauthorized request');
					return new Error('You must be signed in, to have access to this action.');
				}
				//console.log('authorized');
				//add signed-In user to the resolver parameters
				rp.contextUser = user || null;
	      return next(rp);
			} catch (e) {
				return e;
			}
    });
  });
  return resolvers;
}

function candidateAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => async (rp) => {
      //const { source, args, context, info } = resolveParams = rp
			try {
				const candidate = await rp.context.candidate;
				if (!candidate){
					console.log('Unauthorized request');
					return new Error('You must be signed in as a candidate, to have access to this action.');
				}
				//console.log('authorized');
				//add signed-In candidate to the resolver parameters
				rp.contextCandidate = candidate || null;
	      return next(rp);
			} catch (e) {
				return e;
			}
    });
  });
  return resolvers;
}

const schema = GQC.buildSchema();

module.exports = schema;
