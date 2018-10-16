const { Field: { Types }, List } = require('keystone');

/**
 * NotificationReadReceipt Model
 * ==========
 */
const NotificationReadReceipt = new List('NotificationReadReceipt', {
  noedit: true,
});
NotificationReadReceipt.schema.set('usePushEach', true);

NotificationReadReceipt.add({
  notification: {
    type: Types.Relationship, ref: 'Notification', many: false, index: true, required: true, initial: true,
  },
  user: {
    type: Types.Relationship, ref: 'User', many: false, index: true, required: true, initial: true,
  },
  createdAt: { type: Types.Date, index: true, default: Date.now },
});

/**
 * Registration
 */
NotificationReadReceipt.defaultColumns = 'notification, user, createdAt';
NotificationReadReceipt.register();
