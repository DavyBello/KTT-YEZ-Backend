const keystone = require('keystone');

const { Field: { Types }, List } = keystone;

/**
 * GeneralNotification Model
 * ==========
 */
const GeneralNotification = new List('GeneralNotification', {
  track: true,
  hidden: false,
  inherits: keystone.list('Settings'),
});

GeneralNotification.add('GeneralNotification', {
  newBlogPosts: {
    type: Types.Boolean, default: true, index: true,
  },
  newEvents: {
    type: Types.Boolean, default: true, index: true,
  },
});

/**
 * Registration
 */
GeneralNotification.defaultColumns = 'userId, newBlogPosts, newEvents';
GeneralNotification.register();
