const keystone = require('keystone');

module.exports = async (event, payload) => {
  const Notification = keystone.list('Notification').model;
  const NotificationRecipient = keystone.list('NotificationRecipient').model;

  const pubsub = require('../pubsub');
  const {
    notification,
    userIds,
    channel = event.label,
  } = await event.getNotification(payload);
  // const { notification, channel } = await event.getNotification(payload);
  const _notification = new Notification({
    ...notification,
    eventType: event.label,
  });

  await _notification.save();
  NotificationRecipient.insertMany(userIds.map(userId => ({
    notificationId: _notification._id,
    userId,
  })));

  pubsub.publish(channel, _notification);
  // const channels = userIds.map(id => `${channel}.${id}`);

  // pubsub.publish(userIds.map(id => `${channel}.${id}`), {
};
