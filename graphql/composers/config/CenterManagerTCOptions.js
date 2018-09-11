// const { noviewUserFields, noeditUserFields } = require('./fields');

module.exports = {
  fields: {
    remove: [
      'password',
      'passwordVersion',
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
          'phone',
          'result',
          'category',
          'password',
          'passwordVersion',
          'isVerified',
          'isEmployed',
          'documentsUploaded',
          'caseFile',
          'referees',
          'experience',
          'education',
          'certificates',
          'documentsUploaded',
        ],
      },
    },
  },
};
