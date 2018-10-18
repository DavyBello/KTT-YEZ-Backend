const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const Certificate = keystone.list('Certificate').model;

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
  $title: String,
  $authority: String,
  $doesNotExpire: Boolean,
  $fromMonth: EnumCertificateFromMonth,
  $fromYear: String
  $licenseNumber: String,
  $url: String
) {
  updateCertificate(record: {
    _id: $id,
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

describe('updateCertificate Mutation', () => {
  it('should only be able to update certificate for logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const certificate = await createRows.createCandidateCertificate({
      candidateId: user._id,
    });

    const query = UPDATE_CERTIFICATE_MUTATION;

    const updatedTitle = 'Updated School Name';

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: certificate._id,
      title: updatedTitle,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.updateCertificate.record.candidateId).to.equal(`${user._id}`);
    expect(result.data.updateCertificate.record.title).to.equal(updatedTitle);
    expect(result.errors).to.be.undefined;

    const _certificate = await Certificate.findById(result.data.updateCertificate.record._id);
    expect(_certificate.title).to.equal(updatedTitle);
  });

  it('should not be able to change secret fields (e.g candidateId)', async () => {
    const noEditUserFields = [
      'candidateId',
    ];

    const user = await createRows.createCandidate();
    await Promise.all(noEditUserFields.map(async (field) => {
      const UPDATE_CANDIDATE_CERTIFICATE_EDIT_FIELDS_MUTATION = `
      mutation {
        updateCertificate(record: {
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
