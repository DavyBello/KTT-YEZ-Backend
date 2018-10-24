const { Field: { Types }, List } = require('keystone');

/**
 * Settings Model
 * ==========
 */
const Settings = new List('Settings', {
  hidden: true,
  track: {
    createdAt: true,
    updatedAt: true,
  },
});

Settings.add({
  userId: {
    type: Types.Relationship, ref: 'User', index: true, initial: true, required: true,
  },
});

/**
 * Registration
 */
Settings.defaultColumns = 'userId';
Settings.register();
