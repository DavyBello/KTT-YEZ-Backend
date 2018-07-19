var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * LocalGovernment Model
 * ==========
 */
var LocalGovernment = new keystone.List('LocalGovernment', {
    //track: true
});

LocalGovernment.add({
  name: { type: String, initial: true, index: true, required: true },
  state: { type: Types.Relationship, ref: 'State'},
});

/**
 * Registration
 */
LocalGovernment.defaultSort = 'name';
LocalGovernment.defaultColumns = 'name, state';
LocalGovernment.register();
