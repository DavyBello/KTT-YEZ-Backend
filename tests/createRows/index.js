/* eslint-disable no-multi-assign,prefer-const */
const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__)
    .reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

const createUser = require('./createUser');
const createCandidate = require('./createCandidate');

module.exports = {
  restartCounters,
  createUser,
  createCandidate,
};
