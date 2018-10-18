const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const JobExperience = keystone.list('JobExperience').model;

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

const DELETE_JOB_EXPERIENCE_MUTATION = `
mutation M(
  $id: MongoID!,
) {
  deleteJobExperience( _id: $id ) {
    recordId
    record {
      _id
      candidateId
      companyName
      role
      address
      state
      salary
      isWorkingHere
      fromMonth
      fromYear
      duration
      toMonth
      toYear
    }
  }
}
`;

describe('deleteJobExperience Mutation', () => {
  it('should only be able to delete experience for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const experience = await createRows.createCandidateJobExperience({
      candidateId: user._id,
    });

    const query = DELETE_JOB_EXPERIENCE_MUTATION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: experience._id,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.deleteJobExperience.record.candidateId).to.equal(`${user._id}`);
    expect(result.data.deleteJobExperience.record._id).to.equal(`${experience._id}`);
    expect(result.errors).to.be.undefined;

    const jobExperience = await JobExperience.findById(result.data.deleteJobExperience.record._id);
    expect(jobExperience).to.equal(null);
  });
});
