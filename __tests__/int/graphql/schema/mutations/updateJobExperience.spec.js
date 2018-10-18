const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const JobExperience = keystone.list('JobExperience').model;

const { STATES, MONTHS } = require('../../../../../lib/common');
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

const UPDATE_JOB_EXPERIENCE_MUTATION = `
mutation M(
  $id: MongoID!,
  $companyName: String,
  $role: String,
  $address: String,
  $state: EnumJobExperienceState,
  $salary: Float,
  $isWorkingHere: Boolean,
  $fromMonth: EnumJobExperienceFromMonth,
  $fromYear: String
) {
  updateJobExperience(record: {
    _id: $id,
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

describe('updateJobExperience Mutation', () => {
  it('should only be able to update experience for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const experience = await createRows.createCandidateJobExperience({
      candidateId: user._id,
    });

    const query = UPDATE_JOB_EXPERIENCE_MUTATION;

    const updatedCompanyName = 'Updated Company Name';

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: experience._id,
      companyName: updatedCompanyName,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.updateJobExperience.record.candidateId).to.equal(`${user._id}`);
    expect(result.data.updateJobExperience.record.companyName).to.equal(updatedCompanyName);
    expect(result.errors).to.be.undefined;

    const jobExperience = await JobExperience.findById(result.data.updateJobExperience.record._id);
    expect(jobExperience.companyName).to.equal(updatedCompanyName);
  });

  it('should not be able to change secret fields (e.g candidateId)', async () => {
    const noEditUserFields = [
      'candidateId',
    ];

    const user = await createRows.createCandidate();
    await Promise.all(noEditUserFields.map(async (field) => {
      const UPDATE_CANDIDATE_JOB_EXPERIENCE_EDIT_FIELDS_MUTATION = `
      mutation {
        updateJobExperience(record: {
          _id: "${user._id}",
          ${field}: "newValue"
          }) {
          recordId
        }
      }
      `;
      const query = UPDATE_CANDIDATE_JOB_EXPERIENCE_EDIT_FIELDS_MUTATION;

      const rootValue = {};
      const context = getContext();
      const variables = {};

      const result = await graphql(schema, query, rootValue, context, variables);

      expect(result.errors[0].message).to.exist;
    }));
  });
});
