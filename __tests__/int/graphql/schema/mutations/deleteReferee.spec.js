const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const Referee = keystone.list('Referee').model;

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');

const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows, getContext
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

const DELETE_EDUCATION_MUTATION = `
mutation M(
  $id: MongoID!,
) {
  deleteReferee( _id: $id ) {
    recordId
    record {
      _id
      candidateId
      name
      phone
      gender
      email
      occupation
      relationship
      letter
      isVerified
    }
  }
}
`;

describe('deleteReferee Mutation', () => {
  it('should only be able to delete referee for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const referee = await createRows.createCandidateReferee({
      candidateId: user._id,
    });

    const query = DELETE_EDUCATION_MUTATION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: referee._id,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.deleteReferee.record.candidateId).to.equal(`${user._id}`);
    expect(result.data.deleteReferee.record._id).to.equal(`${referee._id}`);
    expect(result.errors).to.be.undefined;

    const _referee = await Referee.findById(result.data.deleteReferee.record._id);
    expect(_referee.d).to.equal(true);
  });
});
