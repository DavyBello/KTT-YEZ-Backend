const { Field: { Types }, List } = require('keystone');

/**
 * NotificationRecipient Model
 * ==========
 */
const NotificationRecipient = new List('NotificationRecipient', {
  noedit: true,
});

NotificationRecipient.add({
  notification: {
    type: Types.Relationship, ref: 'Notification', many: false, index: true, required: true, initial: true,
  },
  user: {
    type: Types.Relationship, ref: 'User', many: false, index: true, required: true, initial: true,
  },
  isRead: {
    type: Types.Boolean, default: false, index: true,
  },
  createdAt: { type: Types.Date, index: true, default: Date.now },
});

/**
 * Registration
 */
NotificationRecipient.defaultColumns = 'notification, user, createdAt';
NotificationRecipient.register();
