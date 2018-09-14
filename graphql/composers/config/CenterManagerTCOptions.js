const { noviewUserFields, noeditUserFields } = require('./fields');

module.exports = {
  fields: {
    remove: [
      ...noviewUserFields,
      'isVerified',
      'isEmployed',
      'documentsUploaded',
      'caseFile',
    ],
  },
  resolvers: {
    updateById: {
      record: {
        removeFields: [
          ...noeditUserFields,
          'phone',
        ],
      },
    },
  },
};
