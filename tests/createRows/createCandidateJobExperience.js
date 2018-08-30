/* eslint-disable no-multi-assign,prefer-const */
const keystone = require('keystone');

const { STATES, MONTHS } = require('../../lib/common');

const JobExperience = keystone.list('JobExperience').model;

module.exports = async (payload = {}) => {
  const n = (global.__COUNTERS__.jobExperience += 1);

  return new JobExperience({
    companyName: `Normal Company ${n}`,
    role: 'Example role',
    address: `Example address ${n}`,
    state: STATES[n],
    salary: 10000 + n,
    isWorkingHere: true,
    fromMonth: MONTHS[n],
    fromYear: '2016',
    ...payload,
  }).save();
};
