// const { noviewUserFields, noeditUserFields } = require('./fields');

module.exports = {
  resolvers: {
    createOne: {
      record: {
        removeFields: [
          // 'candidateId',
          'isVerified',
        ],
      },
    },
    updateById: {
      record: {
        removeFields: [
          'candidateId',
          'isVerified',
        ],
      },
    },
  },
};
