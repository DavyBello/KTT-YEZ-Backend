const { idFields, track } = require('./fields');

module.exports = {
  fields: {
    remove: [...idFields, ...track, 'notificationId', 'userId'],
  },
};
