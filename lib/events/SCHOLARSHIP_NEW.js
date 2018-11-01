const keystone = require('keystone');
const { RECEIVERS_TYPES: { CUSTOM } } = require('../../utils/constants');

const label = 'scholarship_new';
module.exports = {
  label,
  getNotification: async (scholarship) => {
    const ScholarshipNotification = keystone.list('ScholarshipNotification').model;

    // get userids of users that will receive this notification
    const settings = await ScholarshipNotification.find({
      level: { $in: scholarship.levels },
      courses: { $in: scholarship.courses },
    }).select({ userId: 1, _id: 0 });

    const notification = {
      title: scholarship.title,
      refId: scholarship._id,
      receiversType: CUSTOM,
      content: scholarship.description,
    };

    const channels = scholarship.levels.map(
      level => scholarship.courses.map(
        course => `${label}.${level}.${course}`,
      ),
    );

    return {
      notification,
      userIds: settings.map(s => s.userId),
      // channel: `${label}.${scholarship.level}.${scholarship.course}`,
      channels: channels.reduce((acc, val) => acc.concat(val), []),
    };
  },
};
