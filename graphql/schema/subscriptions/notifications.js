const keystone = require('keystone');
// const { withFilter } = require('apollo-server');
const pubsub = require('../../../lib/pubsub');
const {
  BLOG_POST_NEW,
  EVENT_NEW,
  JOB_NEW,
} = require('../../../lib/events');
const { NotificationRecipientTC } = require('../../composers');

const getChannels = async (userId) => {
  const channels = [];

  // GeneralNotification Settings
  const GeneralNotification = keystone.list('GeneralNotification').model;

  const userGN = await GeneralNotification.findOne({ userId })
    .select({ _id: 0, newBlogPosts: 1, newEvents: 1 });

  if (userGN.newBlogPosts) channels.push(BLOG_POST_NEW.label);
  if (userGN.newEvents) channels.push(EVENT_NEW.label);

  // JobAlertNotification Settings
  const JobAlertNotification = keystone.list('JobAlertNotification').model;

  const userJAN = await JobAlertNotification.findOne({ userId })
    .select({ _id: 0, industries: 1 });

  userJAN.industries.map(ind => channels.push(`${JOB_NEW.label}.${ind}`));

  // ScholarshipNotification Settings
  // const ScholarshipNotification = keystone.list('ScholarshipNotification').model;

  // const userSN = await ScholarshipNotification.findOne({ userId })
  //   .select({ _id: 0, level: 1, fieldOfStudy: 1 });

  // userSN.fieldOfStudy.map(field => channels.push(`${JOB_NEW.label}.${level}.${field}`));

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
