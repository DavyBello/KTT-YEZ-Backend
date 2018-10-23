const { Field: { Types }, List } = require('keystone');

const RECEIVERS_TYPE = [
  'ALL_EXISTING_USERS_AT_CREATION',
  'ALL_EXISTING_USERS_AFTER_CREATION',
  'ALL_PAST_AND_FUTURE_USERS',
  'CUSTOM',
];
/**
 * Notification Model
 * ==========
 */
const Notification = new List('Notification', {
  track: {
    createdAt: true,
  },
});

Notification.add({
  message: {
    type: Types.Text, initial: true, required: true, index: true,
  },
  url: { type: Types.Url, initial: true },
  receiversType: {
    type: Types.Select, options: RECEIVERS_TYPE, default: 'ALL_EXISTING_USERS_AT_CREATION', index: true,
  },
  receivers: {
    type: Types.Relationship, ref: 'User', many: true, dependsOn: { receiversType: 'CUSTOM' }, index: true,
  },
});

/**
 * Relationships
 */
Notification.relationship({ ref: 'NotificationReadReceipt', path: 'readReceipts', refPath: 'notification' });

/**
 * Registration
 */
Notification.defaultColumns = 'message, createdAt, receiversType, receivers';
Notification.register();
