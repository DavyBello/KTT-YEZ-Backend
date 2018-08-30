const chai = require('chai');
const { graphql } = require('graphql');
// const keystone = require('keystone');

// const Candidate = keystone.list('Candidate').model;

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');
const getContext = require('../../../../../graphql/lib/getContext');
const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows,
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const CANDIDATE_EXPERIENCE_QUERY = `
{
  viewerCandidate{
    me {
      experiences{
        _id
        companyName
        candidateId
        role
        address
        state
        salary
        fromMonth
        fromYear
        isWorkingHere
        toMonth
        toYear
        duration
        startDate
        endDate
        isVerified
      }
    }
  }
}
`;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe('Candidate JobExperience relationship query', () => {
  it('experience field should be empty when user has no experience', async () => {
    const user = await createRows.createCandidate();
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = CANDIDATE_EXPERIENCE_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.viewerCandidate.me.experiences).to.deep.equal([]);
    expect(result.errors).to.be.undefined;
  });

  // it('experience field should not be empty when user has experience', async () => {
  //   const user = await createRows.createCandidate();
  //   const experience = await createRows.createCandidateJobExperience({
  //     candidateId: user._id,
  //   });
  //   const token = user.signToken();
  //   const jwtPayload = decodeToken(token);
  //
  //   const query = CANDIDATE_EXPERIENCE_QUERY;
  //
  //   const rootValue = {};
  //   const context = getContext({ jwtPayload });
  //   const variables = {};
  //
  //   const result = await graphql(schema, query, rootValue, context, variables);
  //
  //   const { experiences } = result.data.viewerCandidate.me;
  //
  //   expect(experiences[0].companyName).to.equal(experience.companyName);
  //   expect(experiences[0].candidateId).to.equal(`${user._id}`);
  //   expect(result.errors).to.be.undefined;
  // });

  it("experience field should only return logged in user's experience", async () => {
    const user = await createRows.createCandidate();
    const user2 = await createRows.createCandidate();
    const experience = await createRows.createCandidateJobExperience({
      candidateId: user._id,
    });
    // const experience2 = await createRows.createCandidateJobExperience({
    await createRows.createCandidateJobExperience({
      candidateId: user2._id,
    });
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = CANDIDATE_EXPERIENCE_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    const { experiences } = result.data.viewerCandidate.me;

    expect(experiences.length).to.equal(1);
    expect(experiences[0]._id).to.equal(`${experience._id}`);
    expect(experiences[0].companyName).to.equal(experience.companyName);
    expect(experiences[0].candidateId).to.equal(`${user._id}`);
    expect(result.errors).to.be.undefined;
  });
});
