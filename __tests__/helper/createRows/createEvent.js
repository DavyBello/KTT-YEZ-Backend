/* eslint-disable no-multi-assign,prefer-const */
const keystone = require('keystone');

const Event = keystone.list('Event').model;

module.exports = async (payload = {}) => {
  const n = (global.__COUNTERS__.events += 1);

  return new Event({
    name: `Normal Event Name ${n}`,
    date: Date.now(),
    description: 'Normal desc',
    url: 'http://example.com',
    ...payload,
  }).save();
};
