const { Field: { Types }, List } = require('keystone');

const { RECEIVERS_TYPES, RECEIVERS_TYPES: { CUSTOM } } = require('../utils/constants');

/**
 * Notification Model
 * ==========
 */
const Notification = new List('Notification', {
  map: { name: 'title' },
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
    default: CUSTOM,
    index: true,
    initial: true,
  },
});

/**
 * Relationships
 */
Notification.relationship({ ref: 'NotificationRecipient', path: 'recipients', refPath: 'notificationId' });

/**
 * Registration
 */
Notification.defaultColumns = 'title, refId, createdAt, receiversType';
Notification.register();
