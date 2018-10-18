const chai = require('chai');

const queries = require('../../../../graphql/schema/queries');
const mutations = require('../../../../graphql/schema/mutations');

// const { decodeToken } = require('../../../../modelMethods/user');
// 
const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, // createRows,
} = require('../../../helper');

const { expect } = chai;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe('authAccess', () => {
  it('should wrap candidate queries', async () => {
    const wrappedQueries = [
      'candidateIsAuthenticated',
      'viewerCandidate',
    ];

    wrappedQueries.forEach((query) => {
      expect(queries[query]).to.exist;
      expect(queries[query].scope).to.equal('Candidate');
      expect(queries[query].isAuthWrapped).to.equal(true);
    });
  });
  it('should wrap candidate mutations', async () => {
    const wrappedMutations = [
      'candidateUpdateSelf',
      'addJobExperience',
      'updateJobExperience',
      'deleteJobExperience',
      'addEducation',
      'updateEducation',
      'deleteEducation',
      'addCertificate',
      'updateCertificate',
      'deleteCertificate',
      'addReferee',
      'updateReferee',
      // 'deleteReferee',
    ];
    wrappedMutations.forEach((mutation) => {
      expect(mutations[mutation]).to.exist;
      expect(mutations[mutation].scope).to.equal('Candidate');
      expect(mutations[mutation].isAuthWrapped).to.equal(true);
    });
  });
});
