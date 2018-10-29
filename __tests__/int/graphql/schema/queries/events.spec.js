const chai = require('chai');
const { graphql } = require('graphql');

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');

const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows, getContext
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const GET_EVENTS_QUERY = `
{
  events {
    _id
    name
    date
    description
    venue {
      geo
    }
    url
    createdAt
  }
}
`;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe('events Query', () => {
  it('should return array of events', async () => {
    const event = await createRows.createEvent({
      isNS: true,
    });

    const query = GET_EVENTS_QUERY;

    const rootValue = {};
    const context = getContext();
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.events[0]._id).to.equal(`${event._id}`);
    expect(result.errors).to.be.undefined;
  });
});
