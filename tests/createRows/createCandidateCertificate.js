/* eslint-disable no-multi-assign,prefer-const */
const keystone = require('keystone');

const { STATES, MONTHS } = require('../../lib/common');

const Certificate = keystone.list('Certificate').model;

module.exports = async (payload = {}) => {
  const n = (global.__COUNTERS__.certificate += 1);

  return new Certificate({
    title: `Normal Title ${n}`,
    authority: 'Example authority',
    doesNotExpire: true,
    fromMonth: MONTHS[n],
    fromYear: '2016',
    // toYear: '2019',
    ...payload,
  }).save();
};
