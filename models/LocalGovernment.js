const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * LocalGovernment Model
 * ==========
 */
const LocalGovernment = new keystone.List('LocalGovernment', {
  // track: true
});

LocalGovernment.add({
  name: {
    type: String, initial: true, index: true, required: true,
  },
  state: { type: Types.Relationship, ref: 'State' },
});

/**
 * Registration
 */
LocalGovernment.defaultSort = 'name';
LocalGovernment.defaultColumns = 'name, state';
LocalGovernment.register();
