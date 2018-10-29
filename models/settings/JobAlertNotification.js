const keystone = require('keystone');

const { Field: { Types }, List } = keystone;

/**
 * JobAlertNotification Model
 * ==========
 */
const JobAlertNotification = new List('JobAlertNotification', {
  track: {
    createdAt: true,
    updatedAt: true,
  },
});

JobAlertNotification.add('JobAlertNotification', {
  userId: {
    type: Types.Relationship, ref: 'User', index: true, initial: true, required: true, unique: true,
  },
  industries: {
    type: Types.Relationship, ref: 'Industry', many: true, index: true,
  },
});

/**
 * Registration
 */
JobAlertNotification.defaultColumns = 'userId, industries';
JobAlertNotification.register();
