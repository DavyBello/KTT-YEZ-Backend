const { track } = require('./fields');

module.exports = {
  resolvers: {
    createOne: {
      record: {
        removeFields: [
          'name',
          'email',
          ...track,
        ],
      },
    },
  },
};
