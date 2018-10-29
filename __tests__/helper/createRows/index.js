/* eslint-disable no-multi-assign,prefer-const */
const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__)
    .reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

const createUser = require('./createUser');
const createCandidate = require('./createCandidate');
const createCandidateJobExperience = require('./createCandidateJobExperience');
const createCandidateEducation = require('./createCandidateEducation');
const createCandidateCertificate = require('./createCandidateCertificate');
const createCandidateReferee = require('./createCandidateReferee');
const createPost = require('./createPost');
const createPostCategory = require('./createPostCategory');
const createEvent = require('./createEvent');

module.exports = {
  restartCounters,
  createUser,
  createCandidate,
  createCandidateJobExperience,
  createCandidateEducation,
  createCandidateCertificate,
  createCandidateReferee,
  createPost,
  createPostCategory,
  createEvent,
};
