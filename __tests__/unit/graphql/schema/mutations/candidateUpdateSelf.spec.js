const keystone = require('keystone');
const chai = require('chai');
const { graphql } = require('graphql');

const Candidate = keystone.list('Candidate').model;

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

const getUpdateMutation = ({ fieldName, fieldType }) => (`
mutation M (
  $id: MongoID!,
  $${fieldName}: ${fieldType}
){
  candidateUpdateSelf(record: {
    _id: $id,
    ${fieldName}: $${fieldName}
  }) {
    recordId
    record {
      _id
      ${fieldName}
    }
  }
}
`);

describe('candidateUpdateSelf Mutation', () => {
  it('should give an error if user (candidate) is not logged in', async () => {
    const user = await createRows.createCandidate();

    const query = getUpdateMutation({ fieldName: 'firstName', fieldType: 'String' });

    const rootValue = {};
    const context = getContext();
    const variables = {
      id: user._id,
      firstName: 'NewFirstname',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.candidateUpdateSelf).to.equal(null);
    expect(result.errors[0].extensions.code).to.equal('UNAUTHENTICATED');
  });
  it('should not be able to change secret fields (e.g password)', async () => {
    const noEditUserFields = [
      'password',
      'passwordVersion',
      'result',
      'category',
      'isVerified',
      'isActivated',
      'isEmployed',
    ];

    const user = await createRows.createCandidate();
    await Promise.all(noEditUserFields.map(async (field) => {
      const UPDATE_CANDIDATE_NO_EDIT_FIELDS_MUTATION = `
      mutation M {
        candidateUpdateSelf(record: {
          _id: "${user._id}",
          ${field}: "newValue"
        }) {
          recordId
          record {
            _id
            name
          }
        }
      }
      `;
      const query = UPDATE_CANDIDATE_NO_EDIT_FIELDS_MUTATION;

      const rootValue = {};
      const context = getContext();
      const variables = {};

      const result = await graphql(schema, query, rootValue, context, variables);

      expect(result.errors[0].message).to.equal(
        `Field "${field}" is not defined by type UpdateByIdCandidateInput.`,
      );
      // expect(result.errors[0].extensions.code).to.equal('GRAPHQL_VALIDATION_FAILED');
    }));
  });

  it('should only be able to update logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const user1 = await createRows.createCandidate();

    const query = getUpdateMutation({ fieldName: 'firstName', fieldType: 'String' });

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: user1._id,
      firstName: 'NewFirstname',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.candidateUpdateSelf).to.equal(null);
    expect(result.errors[0].message).to.equal('user is not permitted to perform this action');
    expect(result.errors[0].extensions.code).to.equal('UNAUTHENTICATED');
  });

  it('should be able to update the logged in user (i.e the "viewer")', async () => {
    const user = await createRows.createCandidate();

    const token = user.signToken();
    const jwtPayload = decodeToken(token);

    const query = getUpdateMutation({ fieldName: 'firstName', fieldType: 'String' });

    const firstName = 'Newfirstname';

    const rootValue = {};
    const context = getContext({ jwtPayload });
    const variables = {
      id: user._id,
      firstName,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    const { data: { candidateUpdateSelf } } = result;

    expect(candidateUpdateSelf.recordId).to.equal(`${user._id}`);
    expect(candidateUpdateSelf.record._id).to.equal(`${user._id}`);
    expect(candidateUpdateSelf.record.firstName).to.equal(firstName);

    const _user = await Candidate.findById(user._id);
    expect(_user.firstName).to.equal(firstName);

    expect(result.errors).to.be.undefined;
  });

  // it('should generate token when email and password is correct', async () => {
  //   const password = 'awesome';
  //   const user = await createRows.createCandidate({ password });
  //
  //   const query = getUpdateMutation({ fieldName: 'firstName', fieldType: 'String' });
  //
  //   const rootValue = {};
  //   const context = getContext();
  //   const variables = {
  //     phone: user.phone,
  //     password: 'awesome',
  //   };
  //
  //   const result = await graphql(schema, query, rootValue, context, variables);
  //
  //   expect(result.data.loginCandidate.name).to.equal(user.name);
  //   expect(result.data.loginCandidate.token).to.exist;
  //   expect(result.errors).to.be.undefined;
  // });
});
