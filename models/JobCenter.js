const { Field: { Types }, List } = require('keystone');

const { STATES } = require('../lib/common');

/**
 * JobCenter Model
 * ==========
 */
const JobCenter = new List('JobCenter', {
  track: true,
});

JobCenter.add({
  name: {
    type: Types.Text, required: false, initial: true, index: true,
  },
  location: { type: Types.Location, defaults: { country: 'Nigeria' }, enableImprove: true },
  state: { type: Types.Select, options: STATES },
  contactEmail: { type: Types.Text, initial: true },
  contactPhone: { type: Types.Text, initial: true },
  contactName: { type: Types.Text, initial: true },
});

/**
 * Registration
 */
JobCenter.defaultColumns = 'role, companyId, industry';
JobCenter.register();
