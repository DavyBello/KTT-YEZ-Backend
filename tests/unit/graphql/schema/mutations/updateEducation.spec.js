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

const UPDATE_EDUCATION_MUTATION = `
mutation M(
  $id: MongoID!,
  $school: String,
  $degree: String,
  $field: String,
  $grade: String,
  $isSchoolingHere: Boolean,
  $fromYear: String
) {
  updateEducation(record: {
    _id: $id,
    school: $school,
    degree: $degree,
    field: $field,
    grade: $grade,
    isSchoolingHere: $isSchoolingHere,
    fromYear: $fromYear}
  ) {
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

describe('updateEducation Mutation', () => {
  it('should only be able to update education for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const education = await createRows.createCandidateEducation({
      candidateId: user._id,
    });

    const query = UPDATE_EDUCATION_MUTATION;

    const updatedSchool = 'Updated School Name';

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: education._id,
      school: updatedSchool,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.updateEducation.record.candidateId).to.equal(`${user._id}`);
    expect(result.data.updateEducation.record.school).to.equal(updatedSchool);
    expect(result.errors).to.be.undefined;

    const _education = await Education.findById(result.data.updateEducation.record._id);
    expect(_education.school).to.equal(updatedSchool);
  });

  it('should not be able to change secret fields (e.g candidateId)', async () => {
    const noEditUserFields = [
      'candidateId',
    ];

    const user = await createRows.createCandidate();
    await Promise.all(noEditUserFields.map(async (field) => {
      const UPDATE_CANDIDATE_EDUCATION_EDIT_FIELDS_MUTATION = `
      mutation {
        updateEducation(record: {
          _id: "${user._id}",
          ${field}: "newValue"
          }) {
          recordId
        }
      }
      `;
      const query = UPDATE_CANDIDATE_EDUCATION_EDIT_FIELDS_MUTATION;

      const rootValue = {};
      const context = getContext();
      const variables = {};

      const result = await graphql(schema, query, rootValue, context, variables);

      expect(result.errors[0].message).to.exist;
    }));
  });
});
