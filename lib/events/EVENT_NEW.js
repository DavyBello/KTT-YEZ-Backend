const keystone = require('keystone');
const { RECEIVERS_TYPES: { CUSTOM } } = require('../../utils/constants');

module.exports = {
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
};
