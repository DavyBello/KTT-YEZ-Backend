const chai = require('chai');
const { graphql } = require('graphql');
// const keystone = require('keystone');

// const Candidate = keystone.list('Candidate').model;

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');

const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows, getContext
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const CANDIDATE_EDUCATION_QUERY = `
{
  viewerCandidate{
    me {
      certificates {
        _id
        title
        candidateId
        authority
        licenseNumber
        url
        fromMonth
        fromYear
        doesNotExpire
        toMonth
        toYear
        duration
        startDate
        isVerified
      }
    }
  }
}
`;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe('Candidate Certificates relationship query', () => {
  it('certificate field should be empty when user has no certificate', async () => {
    const user = await createRows.createCandidate();
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = CANDIDATE_EDUCATION_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.viewerCandidate.me.certificates).to.deep.equal([]);
    expect(result.errors).to.be.undefined;
  });

  it("certificate field should only return logged in user's certificate record", async () => {
    const user = await createRows.createCandidate();
    const user2 = await createRows.createCandidate();
    const certificate1 = await createRows.createCandidateCertificate({
      candidateId: user._id,
    });
    await createRows.createCandidateCertificate({
      candidateId: user2._id,
    });
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = CANDIDATE_EDUCATION_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    const { certificates } = result.data.viewerCandidate.me;

    expect(certificates.length).to.equal(1);
    expect(certificates[0]._id).to.equal(`${certificate1._id}`);
    expect(certificates[0].title).to.equal(certificate1.title);
    expect(certificates[0].candidateId).to.equal(`${user._id}`);
    expect(result.errors).to.be.undefined;
  });
});
