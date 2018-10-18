const chai = require('chai');
const { graphql } = require('graphql');
// const keystone = require('keystone');

// const Candidate = keystone.list('Candidate').model;

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');

const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows, getContext
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const CANDIDATE_EDUCATION_QUERY = `
{
  viewerCandidate{
    me {
      referees {
        _id
        phone
        gender
        email
        occupation
        relationship
        letter
        isVerified
        candidateId
      }
    }
  }
}
`;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe('Candidate Referees relationship query', () => {
  it('referees field should be empty when user has no referee', async () => {
    const user = await createRows.createCandidate();
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = CANDIDATE_EDUCATION_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.viewerCandidate.me.referees).to.deep.equal([]);
    expect(result.errors).to.be.undefined;
  });

  it("referees field should only return logged in user's referees record", async () => {
    const user = await createRows.createCandidate();
    const user2 = await createRows.createCandidate();
    const referee1 = await createRows.createCandidateReferee({
      candidateId: user._id,
    });
    await createRows.createCandidateReferee({
      candidateId: user2._id,
    });
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = CANDIDATE_EDUCATION_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    const { referees } = result.data.viewerCandidate.me;

    expect(referees.length).to.equal(1);
    expect(referees[0]._id).to.equal(`${referee1._id}`);
    expect(referees[0].title).to.equal(referee1.title);
    expect(referees[0].candidateId).to.equal(`${user._id}`);
    expect(result.errors).to.be.undefined;
  });
});
