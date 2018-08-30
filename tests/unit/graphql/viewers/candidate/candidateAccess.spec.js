const chai = require('chai');
const { graphql } = require('graphql');
const keystone = require('keystone');

// const Candidate = keystone.list('Candidate').model;

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');
const getContext = require('../../../../../graphql/lib/getContext');
const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows,
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const VIEWER_CANDIDATE_QUERY = `
{
  viewerCandidate{
    me {
      _id
      name
      email
      firstName
      lastName
      phone
      username
      isActivated
      category
      address
      stateOfResidence
      imageUrl
      gender
      dateOfBirth
      placeOfBirth
      nationality
      stateOfOrigin
      isEmployed
      isVerified
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
}
`;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe('ViewerCandidate Query', () => {
  it('should be null when user is not logged in', async () => {
    const user = await createRows.createCandidate();

    const query = VIEWER_CANDIDATE_QUERY;

    const rootValue = {};
    const context = getContext();
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.viewerCandidate).to.equal(null);
    expect(result.errors[0].extensions.code).to.equal('UNAUTHENTICATED');
  });

  it('should return the current user when user is logged in', async () => {
    const user = await createRows.createCandidate();
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = VIEWER_CANDIDATE_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.viewerCandidate.me._id).to.equal(`${user._id}`);
    expect(result.data.viewerCandidate.me.name).to.equal(user.name);
    expect(result.data.viewerCandidate.me.email).to.equal(user.email);
    expect(result.data.viewerCandidate.me.phone).to.equal(user.phone);
    // expect(result.data.viewerCandidate.me).to.exist;
    expect(result.errors).to.be.undefined;
  });
});
