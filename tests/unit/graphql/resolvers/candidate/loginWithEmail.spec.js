const chai = require('chai');
const { graphql } = require('graphql');

const schema = require('../../../../../graphql/schema');

// const { decodeToken } = require('../../../../modelMethods/user');
const getContext = require('../../../../../graphql/lib/getContext');
const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows,
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const LOGIN_CANDIDATE_MUTATION = `
mutation M(
  $email: String!,
  $password: String!
) {
  loginCandidate(input: {
    email: $email,
    password: $password
  }) {
    token
    name
  }
}
`;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe('loginWithEmail Mutation', () => {
  it('should not login if email is not in the database', async () => {
    const query = LOGIN_CANDIDATE_MUTATION;

    const rootValue = {};
    const context = getContext();
    const variables = {
      email: 'randomemail@a.com',
      password: 'awesome',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.loginCandidate).to.equal(null);
    expect(result.errors[0].message).to.equal('email not found');
    expect(result.errors[0].extensions.code).to.equal('BAD_USER_INPUT');
  });

  it('should not login with wrong password', async () => {
    const user = await createRows.createCandidate();

    const query = LOGIN_CANDIDATE_MUTATION;

    const rootValue = {};
    const context = getContext();
    const variables = {
      email: user.email,
      password: 'awesome',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.loginCandidate).to.equal(null);
    expect(result.errors[0].message).to.equal('invalid password');
  });

  it('should generate token when email and password is correct', async () => {
    const password = 'awesome';
    const user = await createRows.createCandidate({ password });

    const query = LOGIN_CANDIDATE_MUTATION;

    const rootValue = {};
    const context = getContext();
    const variables = {
      email: user.email,
      password: 'awesome',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.loginCandidate.name).to.equal(user.name);
    expect(result.data.loginCandidate.token).to.exist;
    expect(result.errors).to.be.undefined;
  });
});
