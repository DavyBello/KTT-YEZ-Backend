const keystone = require('keystone');
const { RECEIVERS_TYPES: { CUSTOM } } = require('../../utils/constants');


module.exports = {
  // JOB_NEW: 'job_new',
  BLOG_POST_NEW: {
    label: 'blog_post_new',
    getNotification: async (post) => {
      const GeneralNotification = keystone.list('GeneralNotification').model;

      // get userids of users that will receive this notification
      const settings = await GeneralNotification.find({ newBlogPosts: true })
        .select({ userId: 1, _id: 0 });

      const notification = {
        title: post.title,
        refId: post._id,
        receiversType: CUSTOM,
        content: post.content.brief,
      };

      return {
        notification,
        userIds: settings.map(s => s.userId),
        // channel: null,
      };
    },
  },
  EVENT_NEW: {
    label: 'event_new',
    getNotification: async (event) => {
      const GeneralNotification = keystone.list('GeneralNotification').model;

      // get userids of users that will receive this notification
      const settings = await GeneralNotification.find({ newEvents: true })
        .select({ userId: 1, _id: 0 });

      const notification = {
        title: event.name,
        refId: event._id,
        receiversType: CUSTOM,
        content: event.description,
      };

      return {
        notification,
        userIds: settings.map(s => s.userId),
        // channel: null,
      };
    },
  },
};
