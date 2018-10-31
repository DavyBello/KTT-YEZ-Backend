const keystone = require('keystone');
const { RECEIVERS_TYPES: { CUSTOM } } = require('../../utils/constants');

const label = 'job_new';
module.exports = {
  label,
  getNotification: async (job) => {
    const JobAlertNotification = keystone.list('JobAlertNotification').model;

    // get userids of users that will receive this notification
    const settings = await JobAlertNotification.find({ industries: job.industry })
      .select({ userId: 1, _id: 0 });

    const notification = {
      title: `${job.role} at ${job.companyName}`,
      refId: job._id,
      receiversType: CUSTOM,
      content: job.basicDescription,
    };

    return {
      notification,
      userIds: settings.map(s => s.userId),
      channel: `${label}.${job.industry}`,
    };
  },
};
