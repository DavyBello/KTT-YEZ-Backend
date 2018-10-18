/* eslint-disable no-multi-assign,prefer-const */
const keystone = require('keystone');

const { GENDERS } = require('../../../lib/common');

const Referee = keystone.list('Referee').model;

module.exports = async (payload = {}) => {
  const n = (global.__COUNTERS__.referee += 1);

  return new Referee({
    name: `Normal user ${n}`,
    phone: `0818855562${n}`,
    gender: GENDERS[0],
    email: `referee-${n}@example.com`,
    occupation: `Normal occupation ${n}`,
    relationship: `Normal relationship ${n}`,
    letter: `Normal letter ${n}`,
    // isVerified: false,
    ...payload,
  }).save();
};
