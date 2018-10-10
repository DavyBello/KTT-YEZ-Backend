/* eslint-disable no-multi-assign,prefer-const */
const keystone = require('keystone');

const Candidate = keystone.list('Candidate').model;

module.exports = async (payload = {}) => {
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
