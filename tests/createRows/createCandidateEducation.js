/* eslint-disable no-multi-assign,prefer-const */
const keystone = require('keystone');

const { STATES } = require('../../lib/common');

const Education = keystone.list('Education').model;

module.exports = async (payload = {}) => {
  const n = (global.__COUNTERS__.education += 1);

  return new Education({
    school: `Normal Company ${n}`,
    degree: 'Example degree',
    field: 'Example field',
    grade: '1st Class',
    state: STATES[n],
    salary: 10000 + n,
    isSchoolingHere: true,
    fromYear: '2016',
    // toYear: '2019',
    ...payload,
  }).save();
};
