/* eslint-disable func-names */
const keystone = require('keystone');

const { Field: { Types }, List } = keystone;

/**
 * Scholarship Model
 * ==========
 */

const Scholarship = new List('Scholarship', {
  map: { name: 'title' },
  track: true,
});

Scholarship.add({
  title: { type: String, required: true },
  url: { type: Types.Url, initial: true },
  image: { type: Types.CloudinaryImage, initial: true },
  description: {
    type: Types.Html, wysiwyg: true, height: 150, initial: true,
  },
  levels: {
    type: Types.Relationship, ref: 'ScholarshipLevel', many: true, index: true, initial: true,
  },
  courses: {
    type: Types.Relationship, ref: 'ScholarshipCourse', many: true, index: true, initial: true,
  },
  // isNotificationSent
  isNS: { type: Boolean, noedit: true, hidden: true },
});

const { createNotification } = require('../lib/services');
const { SCHOLARSHIP_NEW } = require('../lib/events');

// Model Hooks
Scholarship.schema.pre('save', async function (next) {
  if (!this.isNS) {
    await createNotification(SCHOLARSHIP_NEW, this);
    this.isNS = true;
  }
  next();
});

Scholarship.schema.post('remove', async function () {
  // console.log(this);
  const Notification = keystone.list('Notification').model;
  const notification = await Notification.findOne({ refId: this._id });
  await notification.remove();
  // next();
});

Scholarship.defaultColumns = 'title, levels|20%, courses|20%, createdAt|20%';
Scholarship.register();
