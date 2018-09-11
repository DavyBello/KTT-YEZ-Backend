const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const Certificate = keystone.list('Certificate').model;

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

const DELETE_EDUCATION_MUTATION = `
mutation M(
  $id: MongoID!,
) {
  deleteCertificate( _id: $id ) {
    recordId
    record {
      _id
      candidateId
      title
      authority
      doesNotExpire
      fromMonth
      fromYear
      toMonth
      toYear
      duration
      licenseNumber
      url
    }
  }
}
`;

describe('deleteCertificate Mutation', () => {
  it('should only be able to delete certificate for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const certificate = await createRows.createCandidateCertificate({
      candidateId: user._id,
    });

    const query = DELETE_EDUCATION_MUTATION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: certificate._id,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.deleteCertificate.record.candidateId).to.equal(`${user._id}`);
    expect(result.data.deleteCertificate.record._id).to.equal(`${certificate._id}`);
    expect(result.errors).to.be.undefined;

    const _certificate = await Certificate.findById(result.data.deleteCertificate.record._id);
    expect(_certificate).to.equal(null);
  });
});
