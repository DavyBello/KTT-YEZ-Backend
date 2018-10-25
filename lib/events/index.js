const keystone = require('keystone');
const { RECEIVERS_TYPES: { CUSTOM } } = require('../../utils/constants');


module.exports = {
  JOB_NEW: 'job_new',
  BLOG_POST_NEW: {
    label: 'blog_post_new',
    getNotification: async (post) => {
      const GeneralNotification = keystone.list('GeneralNotification').model;

      // TODO: get userids of users that will receive this notification
      const userIds = await GeneralNotification.find({});
      // TODO: .insertMany save all user ids

      const notification = {
        title: post.title,
        refId: post._id,
        // eventType,
        receiversType: CUSTOM,
        receivers: userIds,
        content: post.content.brief,
        // url,
      };

      return {
        notification,
        channel: '',
      };
    },
  },
  EVENT_NEW: 'event_new',
};
