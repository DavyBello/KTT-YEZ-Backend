const keystone = require('keystone');
// const { withFilter } = require('apollo-server');
const pubsub = require('../../../lib/pubsub');
const { BLOG_POST_NEW } = require('../../../lib/events');
const { NotificationRecipientTC } = require('../../composers');

const getChannels = async (userId) => {
  const channels = [];

  const GeneralNotification = keystone.list('GeneralNotification').model;

  const rGN = await GeneralNotification.findOne({ userId })
    .select({ _id: 0, newBlogPosts: 1, newEvents: 1 });

  if (rGN.newBlogPosts) channels.push(BLOG_POST_NEW.label);
  // if (rGN.newEvents) channels.push(BLOG_POST_NEW.label);

  return channels;
};

module.exports = {
  type: NotificationRecipientTC.getType(),
  description: 'Subscribe to an Ping Event',
  resolve: payload => ({
    isRead: false,
    notificationId: payload._id,
  }),
  subscribe: async (_, args, { jwtPayload: { id } = {} }) => pubsub
    .asyncIterator(await getChannels(id)),
//   subscribe: withFilter(
//     () => pubsub.asyncIterator([POST_ADDED]),
//     (payload, variables) => {
//         console.log(payload);
//         console.log(variables);
//         return true;
//     },
//   ),
};
