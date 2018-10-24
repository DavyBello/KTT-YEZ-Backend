const keystone = require('keystone');

const { Field: { Types }, List } = keystone;

const SCHOLARSHIP_LEVELS = [
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
/**
 * ScholarshipNotification Model
 * ==========
 */
const ScholarshipNotification = new List('ScholarshipNotification', {
  track: true,
  hidden: false,
  inherits: keystone.list('Settings'),
});

ScholarshipNotification.add('ScholarshipNotification', {
  level: {
    type: Types.Select, options: SCHOLARSHIP_LEVELS, index: true,
  },
  fieldOfStudy: {
    type: Types.Relationship, ref: 'Course', many: true, index: true,
  },
});

/**
 * Registration
 */
ScholarshipNotification.defaultColumns = 'userId, level, fieldOfStudy';
ScholarshipNotification.register();
