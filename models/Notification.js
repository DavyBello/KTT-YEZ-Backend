const keystone = require('keystone');

const { Field: { Types }, List } = keystone;
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

// Model Hooks
Notification.schema.post('remove', async function () {
  const NotificationRecipient = keystone.list('NotificationRecipient').model;
  await NotificationRecipient.deleteMany({ notificationId: this._id });
  // next();
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
