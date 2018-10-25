const keystone = require('keystone');

// const pubsub = require('../pubsub');

const Notification = keystone.list('Notification').model;

module.exports = async (event, payload) => {
  const { notification } = await event.getNotification(payload);
  // const { notification, channel } = await event.getNotification(payload);
  const _notification = new Notification({
    ...notification,
    eventType: event.label,
  });
  // const notification = new Notification({
  //   title,
  //   refId,
  //   eventType,
  //   receiversType,
  //   receivers,
  //   content,
  //   url,
  // });

  await _notification.save();
  // pubsub.publish(`${channel}`)
  // pubsub.publish(channel, _notification)
};
