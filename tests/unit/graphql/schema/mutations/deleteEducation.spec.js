const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const Education = keystone.list('Education').model;

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');
const getContext = require('../../../../../graphql/lib/getContext');
const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows,
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
  deleteEducation( _id: $id ) {
    recordId
    record {
      _id
      candidateId
      school
      degree
      field
      grade
      isSchoolingHere
      fromYear
      duration
      toYear
    }
  }
}
`;

describe('deleteEducation Mutation', () => {
  it('should only be able to delete education for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const education = await createRows.createCandidateEducation({
      candidateId: user._id,
    });

    const query = DELETE_EDUCATION_MUTATION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: education._id,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.deleteEducation.record.candidateId).to.equal(`${user._id}`);
    expect(result.data.deleteEducation.record._id).to.equal(`${education._id}`);
    expect(result.errors).to.be.undefined;

    const jobExperience = await Education.findById(result.data.deleteEducation.record._id);
    expect(jobExperience).to.equal(null);
  });
});
