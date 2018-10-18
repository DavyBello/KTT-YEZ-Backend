const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const Referee = keystone.list('Referee').model;

const { GENDERS } = require('../../../../../lib/common');

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

const ADD_REFEREE_MUTATION = `
  mutation M(
    $candidateId: MongoID!,
    $name: String!,
    $phone: String!,
    $gender: EnumRefereeGender!,
    $email: String!,
    $occupation: String!,
    $relationship: String!
  ) {
    addReferee(record: {
      candidateId: $candidateId,
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

describe('addReferee Mutation', () => {
  it('should only be able to create referee for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const user1 = await createRows.createCandidate();

    const query = ADD_REFEREE_MUTATION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      candidateId: user1._id,
      name: 'Normal user',
      phone: '08188555624',
      gender: GENDERS[0],
      email: 'referee-@example.com',
      occupation: 'Normal occupation',
      relationship: 'Normal relationship',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.addReferee.record.candidateId).to.equal(`${user._id}`);
    expect(result.errors).to.be.undefined;

    const referee = await Referee.findById(result.data.addReferee.record._id);
    expect(referee.candidateId).to.deep.equal(user._id);
  });
});
