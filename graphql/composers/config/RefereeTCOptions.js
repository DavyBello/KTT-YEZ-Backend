// const { noviewUserFields, noeditUserFields } = require('./fields');

module.exports = {
  fields: {
    remove: ['d'],
  },
  resolvers: {
    createOne: {
      record: {
        removeFields: [
          // 'candidateId',
          'isVerified',
          'd',
        ],
      },
    },
    updateById: {
      record: {
        removeFields: [
          'candidateId',
          'isVerified',
          'd',
        ],
      },
    },
  },
};
