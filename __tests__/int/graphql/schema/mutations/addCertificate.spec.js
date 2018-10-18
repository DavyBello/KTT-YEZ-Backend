const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const Certificate = keystone.list('Certificate').model;

const { MONTHS } = require('../../../../../lib/common');

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

const ADD_CERTIFICATE_MUTATION = `
  mutation M(
    $candidateId: MongoID!,
    $title: String!,
    $authority: String!,
    $doesNotExpire: Boolean!,
    $fromMonth: EnumCertificateFromMonth!,
    $fromYear: String!
    $licenseNumber: String,
    $url: String
  ) {
    addCertificate(record: {
      candidateId: $candidateId,
      title: $title,
      authority: $authority,
      doesNotExpire: $doesNotExpire,
      fromMonth: $fromMonth,
      fromYear: $fromYear,
      licenseNumber: $licenseNumber,
      url: $url
    }
    ) {
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

describe('addCertificate Mutation', () => {
  it('should only be able to create certificate for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const user1 = await createRows.createCandidate();

    const query = ADD_CERTIFICATE_MUTATION;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      candidateId: user1._id,
      title: 'Normal School',
      authority: 'Example authority',
      doesNotExpire: true,
      fromMonth: MONTHS[0],
      fromYear: '2016',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.addCertificate.record.candidateId).to.equal(`${user._id}`);
    expect(result.errors).to.be.undefined;

    const certificate = await Certificate.findById(result.data.addCertificate.record._id);
    expect(certificate.candidateId).to.deep.equal(user._id);
  });
});
