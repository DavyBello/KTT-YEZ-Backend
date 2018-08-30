const chai = require('chai');
const { graphql } = require('graphql');
// const keystone = require('keystone');

// const Candidate = keystone.list('Candidate').model;

const schema = require('../../../../../graphql/schema');

const { decodeToken } = require('../../../../../modelMethods/user');
const getContext = require('../../../../../graphql/lib/getContext');
const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows,
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const CANDIDATE_EDUCATION_QUERY = `
{
  viewerCandidate{
    me {
      education {
        _id
        school
        candidateId
        degree
        field
        grade
        fromYear
        isSchoolingHere
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

describe('Candidate Education relationship query', () => {
  it('education field should be empty when user has no education', async () => {
    const user = await createRows.createCandidate();
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = CANDIDATE_EDUCATION_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.viewerCandidate.me.education).to.deep.equal([]);
    expect(result.errors).to.be.undefined;
  });

  // it('education field should not be empty when user has education', async () => {
  //   const user = await createRows.createCandidate();
  //   const newEducation = await createRows.createCandidateEducation({
  //     candidateId: user._id,
  //   });
  //   const token = user.signToken();
  //   const jwtPayload = decodeToken(token);
  //
  //   const query = CANDIDATE_EDUCATION_QUERY;
  //
  //   const rootValue = {};
  //   const context = getContext({ jwtPayload });
  //   const variables = {};
  //
  //   const result = await graphql(schema, query, rootValue, context, variables);
  //
  //   const { education } = result.data.viewerCandidate.me;
  //
  //   expect(education[0].companyName).to.equal(newEducation.companyName);
  //   expect(education[0].candidateId).to.equal(`${user._id}`);
  //   expect(result.errors).to.be.undefined;
  // });

  it("education field should only return logged in user's education record", async () => {
    const user = await createRows.createCandidate();
    const user2 = await createRows.createCandidate();
    const education1 = await createRows.createCandidateEducation({
      candidateId: user._id,
    });
    // const education2 = await createRows.createCandidateEducation({
    await createRows.createCandidateEducation({
      candidateId: user2._id,
    });
    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = CANDIDATE_EDUCATION_QUERY;

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);

    const { education } = result.data.viewerCandidate.me;

    expect(education.length).to.equal(1);
    expect(education[0]._id).to.equal(`${education1._id}`);
    expect(education[0].school).to.equal(education1.school);
    expect(education[0].candidateId).to.equal(`${user._id}`);
    expect(result.errors).to.be.undefined;
  });
});
