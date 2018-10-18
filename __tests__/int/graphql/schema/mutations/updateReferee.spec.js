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

const UPDATE_CERTIFICATE_MUTATION = `
mutation M(
  $id: MongoID!,
  $name: String,
  $phone: String,
  $gender: EnumRefereeGender,
  $email: String,
  $occupation: String,
  $relationship: String
) {
  updateReferee(record: {
    _id: $id,
    name: $name,
    phone: $phone,
    gender: $gender,
    email: $email,
    occupation: $occupation,
    relationship: $relationship
  }) {
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

describe('updateReferee Mutation', () => {
  it('should only be able to update referee for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const referee = await createRows.createCandidateReferee({
      candidateId: user._id,
    });

    const query = UPDATE_CERTIFICATE_MUTATION;

    const updatedName = 'Updated Name';

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: referee._id,
      name: updatedName,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.updateReferee.record.candidateId).to.equal(`${user._id}`);
    expect(result.data.updateReferee.record.name).to.equal(updatedName);
    expect(result.errors).to.be.undefined;

    const _referee = await Referee.findById(result.data.updateReferee.record._id);
    expect(_referee.name).to.equal(updatedName);
  });

  it('should not be able to change secret fields (e.g candidateId)', async () => {
    const noEditUserFields = [
      'candidateId',
    ];

    const user = await createRows.createCandidate();
    await Promise.all(noEditUserFields.map(async (field) => {
      const UPDATE_CANDIDATE_CERTIFICATE_EDIT_FIELDS_MUTATION = `
      mutation {
        updateReferee(record: {
          _id: "${user._id}",
          ${field}: "newValue"
          }) {
          recordId
        }
      }
      `;
      const query = UPDATE_CANDIDATE_CERTIFICATE_EDIT_FIELDS_MUTATION;

      const rootValue = {};
      const context = getContext();
      const variables = {};

      const result = await graphql(schema, query, rootValue, context, variables);

      expect(result.errors[0].message).to.exist;
    }));
  });
});
