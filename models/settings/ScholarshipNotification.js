const keystone = require('keystone');

const { Field: { Types }, List } = keystone;

// const { SCHOLARSHIP_LEVELS } = require('../../utils/constants');
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
    type: Types.Relationship, ref: 'ScholarshipLevel', many: false, index: true,
  },
  courses: {
    type: Types.Relationship, ref: 'ScholarshipCourse', many: true, index: true,
  },
});

/**
 * Registration
 */
ScholarshipNotification.defaultColumns = 'userId, level, courses';
ScholarshipNotification.register();
