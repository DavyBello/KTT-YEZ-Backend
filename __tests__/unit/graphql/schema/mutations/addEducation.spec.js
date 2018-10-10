const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const Education = keystone.list('Education').model;

// const { STATES, MONTHS } = require('../../../../../lib/common');
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

const ADD_EDUCATION_MUTATION = `
  mutation M(
    $candidateId: MongoID!,
    $school: String!,
    $degree: String!,
    $field: String!,
    $grade: String!,
    $isSchoolingHere: Boolean!,
    $fromYear: String!
  ) {
    addEducation(record: {
      candidateId: $candidateId,
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

describe('addEducation Mutation', () => {
  it('should only be able to create education for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const user1 = await createRows.createCandidate();

    const query = ADD_EDUCATION_MUTATION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      candidateId: user1._id,
      school: 'Normal School',
      degree: 'Example degree',
      field: 'Example field',
      grade: '1st Class',
      isSchoolingHere: true,
      fromYear: '2016',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.addEducation.record.candidateId).to.equal(`${user._id}`);
    expect(result.errors).to.be.undefined;

    const education = await Education.findById(result.data.addEducation.record._id);
    expect(education.candidateId).to.deep.equal(user._id);
  });
});
