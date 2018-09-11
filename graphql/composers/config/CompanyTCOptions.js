// const { noviewUserFields, noeditUserFields } = require('./fields');

module.exports = {
  fields: {
    remove: [
      'password',
      'passwordVersion',
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
          'jobs',
          'cacRegNo',
          'password',
          'passwordVersion',
          'isVerified',
          'isActive',
        ],
      },
    },
  },
};
