const keystone = require('keystone');

const GeneralNotification = keystone.list('GeneralNotification').model;
const JobAlertNotification = keystone.list('JobAlertNotification').model;
const ScholarshipNotification = keystone.list('ScholarshipNotification').model;

const defaultGeneralNotification = {
  newBlogPosts: true,
  newEvents: true,
};
const defaultJobAlertNotification = {
  industries: [],
};
const defaultScholarshipNotification = {
  level: null,
  fieldOfStudy: [],
};

module.exports = function () {
  const userId = this._id;
  try {
    GeneralNotification.create({
      userId,
      ...defaultGeneralNotification,
    });
    JobAlertNotification.create({
      userId,
      ...defaultJobAlertNotification,
    });
    ScholarshipNotification.create({
      userId,
      ...defaultScholarshipNotification,
    });
  } catch (error) {
    console.log(error);
  }
};
