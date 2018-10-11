const { noviewUserFields, noeditUserFields } = require('./fields');

module.exports = {
  fields: {
    remove: [...noviewUserFields],
  },
  resolvers: {
    updateById: {
      record: {
        removeFields: [
          ...noeditUserFields,
          'result',
          'category',
          'isEmployed',
          'isActivated',
        ],
      },
    },
  },
};
