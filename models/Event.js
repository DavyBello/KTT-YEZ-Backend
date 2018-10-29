const { Field: { Types }, List } = require('keystone');

/**
 * Event Model
 * ==========
 */
const Event = new List('Event', {
  track: true,
});

Event.add({
  name: {
    type: Types.Text, initial: true, required: true, index: true,
  },
  date: {
    type: Types.Datetime, initial: true, required: true, index: true,
  },
  description: {
    type: Types.Text, initial: true, required: true,
  },
  venue: { type: Types.Location, defaults: { country: 'Nigeria' }, enableImprove: true },
  url: { type: Types.Url, initial: true },
  // isNotificationSent
  isNS: { type: Boolean, noedit: true, hidden: true },
});

const { createNotification } = require('../lib/services');
const { EVENT_NEW } = require('../lib/events');

// Model Hooks
Event.schema.pre('save', async function (next) {
  if (this.state === 'published' && !this.isNS) {
    await createNotification(EVENT_NEW, this);
    this.isNS = true;
  }
  next();
});

/**
 * Registration
 */
Event.defaultColumns = 'name, date, venue, createdAt';
Event.register();
