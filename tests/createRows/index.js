/* eslint-disable no-multi-assign,prefer-const */
const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__)
    .reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

const createUser = require('./createUser');
const createCandidate = require('./createCandidate');
const createCandidateJobExperience = require('./createCandidateJobExperience');
const createPost = require('./createPost');
const createPostCategory = require('./createPostCategory');

module.exports = {
  restartCounters,
  createUser,
  createCandidate,
  createCandidateJobExperience,
  createPost,
  createPostCategory,
};
