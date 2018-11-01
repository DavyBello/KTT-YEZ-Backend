/**
 * This script automatically creates the scholarsip levels below
 * when an empty database is used for the first time. You can use this
 */
const keystone = require('keystone');

const levels = [
  'Certificate',
  'Competitions',
  'Diploma',
  'Fellowship',
  'Masters',
  'NonDegree',
  'PhD',
  'PostdoctoralFellowships',
  'Training',
  'Undergraduate',
];

const ScholarshipLevel = keystone.list('ScholarshipLevel').model;

module.exports = (done) => {
  levels.map(level => ScholarshipLevel.create({ name: level }));
  done();
};
