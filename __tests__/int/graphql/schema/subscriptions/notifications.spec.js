const chai = require('chai');
const { graphql } = require('graphql');

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');

const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows, getContext
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const NOTIFICATIONS_SUBSCRIPTION = `
subscription{
  notifications{
    isRead
    details{
      _id
      title
      refId
      eventType
      content
      url
      createdAt
    }
  }
}
`;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe.skip('notifications Subscription', () => {
  it('should return array of notifications', async () => {
    const user = await createRows.createCandidate();
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const postCategory = await createRows.createPostCategory();
    await createRows.createPost({
      categories: [postCategory._id],
      state: 'published',
      isNS: true,
    });

    const event = await createRows.createEvent({
      // isNS: true,
    });

    const query = NOTIFICATIONS_SUBSCRIPTION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    console.log(result);
    // expect(result.data.notifications[0]._id).to.equal(`${event._id}`);
    expect(result.errors).to.be.undefined;
  });
});
