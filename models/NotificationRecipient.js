const { Field: { Types }, List } = require('keystone');

/**
 * NotificationRecipient Model
 * ==========
 */
const NotificationRecipient = new List('NotificationRecipient', {
  noedit: true,
  track: {
    createdAt: true,
  },
});

NotificationRecipient.add({
  notificationId: {
    type: Types.Relationship, ref: 'Notification', many: false, index: true, required: true, initial: true,
  },
  userId: {
    type: Types.Relationship, ref: 'User', many: false, index: true, required: true, initial: true,
  },
  isRead: {
    type: Types.Boolean, default: false, index: true,
  },
  // readAt: { type: Types.Date, index: true, default: Date.now },
  // createdAt: { type: Types.Date, index: true, default: Date.now },
});

/**
 * Registration
 */
NotificationRecipient.defaultColumns = 'notificationId, userId, isRead';
NotificationRecipient.register();
