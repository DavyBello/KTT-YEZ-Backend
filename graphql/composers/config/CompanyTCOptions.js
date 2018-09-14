const { noviewUserFields, noeditUserFields } = require('./fields');

module.exports = {
  fields: {
    remove: [
      ...noviewUserFields,
      'createdAt',
      'createdBy',
      'updatedAt',
      'updatedBy',
    ],
  },
  resolvers: {
    updateById: {
      record: {
        removeFields: [
          ...noeditUserFields,
          'cacRegNo',
          'isActive',
        ],
      },
    },
  },
};
