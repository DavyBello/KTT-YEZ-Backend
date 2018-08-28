/* eslint-disable no-multi-assign,prefer-const */
const keystone = require('keystone');

const User = keystone.list('User').model;
const Candidate = keystone.list('Candidate').model;

const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__)
    .reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

const createUser = async (payload = {}) => {
  const n = (global.__COUNTERS__.user += 1);

  return new User({
    name: `Normal user ${n}`,
    email: `user-${n}@example.com`,
    password: '123456',
    ...payload,
  }).save();
};

const createCandidate = async (payload = {}) => {
  const n = (global.__COUNTERS__.user += 1);

  return new Candidate({
    name: `Normal user ${n}`,
    email: `user-${n}@example.com`,
    password: '123456',
    firstName: `firstName${n}`,
    lastName: `lastName${n}`,
    phone: `0818855561${n}`,
    ...payload,
  }).save();
};

module.exports = {
  restartCounters,
  createUser,
  createCandidate,
};
