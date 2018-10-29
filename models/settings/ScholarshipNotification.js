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
  track: {
    createdAt: true,
    updatedAt: true,
  },
});

ScholarshipNotification.add('ScholarshipNotification', {
  userId: {
    type: Types.Relationship, ref: 'User', index: true, initial: true, required: true, unique: true,
  },
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
