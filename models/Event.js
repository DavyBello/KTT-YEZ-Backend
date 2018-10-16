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
});

/**
 * Registration
 */
Event.defaultColumns = 'name, date, venue, createdAt';
Event.register();
