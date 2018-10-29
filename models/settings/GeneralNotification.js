const keystone = require('keystone');

const { Field: { Types }, List } = keystone;

/**
 * GeneralNotification Model
 * ==========
 */
const GeneralNotification = new List('GeneralNotification', {
  track: {
    createdAt: true,
    updatedAt: true,
  },
});

GeneralNotification.add('GeneralNotification', {
  userId: {
    type: Types.Relationship, ref: 'User', index: true, initial: true, required: true, unique: true,
  },
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
