const keystone = require('keystone');

const { Field: { Types }, List } = keystone;

/**
 * JobAlertNotification Model
 * ==========
 */
const JobAlertNotification = new List('JobAlertNotification', {
  track: true,
  hidden: false,
  inherits: keystone.list('Settings'),
});

JobAlertNotification.add('JobAlertNotification', {
  industries: {
    type: Types.Relationship, ref: 'Industry', many: true, index: true,
  },
});

/**
 * Registration
 */
JobAlertNotification.defaultColumns = 'userId, industries';
JobAlertNotification.register();
