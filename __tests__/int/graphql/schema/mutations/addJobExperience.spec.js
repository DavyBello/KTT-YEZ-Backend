const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const JobExperience = keystone.list('JobExperience').model;

const { STATES, MONTHS } = require('../../../../../lib/common');
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

const ADD_JOB_EXPERIENCE_MUTATION = `
  mutation M(
    $candidateId: MongoID!,
    $companyName: String!,
    $role: String!,
    $address: String!,
    $state: EnumJobExperienceState!,
    $salary: Float!,
    $isWorkingHere: Boolean!,
    $fromMonth: EnumJobExperienceFromMonth!,
    $fromYear: String!
  ) {
    addJobExperience(record: {
      candidateId: $candidateId,
      companyName: $companyName,
      role: $role,
      address: $address,
      state: $state,
      salary: $salary,
      isWorkingHere: $isWorkingHere,
      fromMonth: $fromMonth,
      fromYear: $fromYear}
    ) {
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

describe('addJobExperience Mutation', () => {
  it('should only be able to create experience for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const user1 = await createRows.createCandidate();

    const query = ADD_JOB_EXPERIENCE_MUTATION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      candidateId: user1._id,
      companyName: 'Normal Company',
      role: 'Example role',
      address: 'Example address',
      state: STATES[0],
      salary: 10000,
      isWorkingHere: true,
      fromMonth: MONTHS[0],
      fromYear: '2016',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.addJobExperience.record.candidateId).to.equal(`${user._id}`);
    expect(result.errors).to.be.undefined;

    const jobExperience = await JobExperience.findById(result.data.addJobExperience.record._id);
    expect(jobExperience.candidateId).to.deep.equal(user._id);
  });
});
