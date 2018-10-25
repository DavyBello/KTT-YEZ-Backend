const { Field: { Types }, List } = require('keystone');

const { RECEIVERS_TYPES, RECEIVERS_TYPES: { ALL_EXISTING_USERS_AT_CREATION } } = require('../utils/constants');
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
  title: {
    type: Types.Text, initial: true, required: true, index: true,
  },
  refId: {
    type: Types.Text, initial: true, required: true, index: true,
  },
  eventType: {
    type: Types.Text, initial: true, required: true, index: true,
  },
  content: {
    type: Types.Text, initial: true, required: true, index: true,
  },
  url: { type: Types.Url, initial: true },
  receiversType: {
    type: Types.Select,
    options: Object.values(RECEIVERS_TYPES),
    default: ALL_EXISTING_USERS_AT_CREATION,
    index: true,
  },
});

/**
 * Relationships
 */
Notification.relationship({ ref: 'NotificationRecipient', path: 'recipients', refPath: 'notificationId' });

/**
 * Registration
 */
Notification.defaultColumns = 'message, createdAt, receiversType, receivers';
Notification.register();
