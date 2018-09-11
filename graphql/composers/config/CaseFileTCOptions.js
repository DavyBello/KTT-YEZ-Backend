// const { noviewUserFields, noeditUserFields } = require('./fields');

module.exports = {
  resolvers: {
    createOne: {
      record: {
        removeFields: [
          'fileNumber',
          'authorManager',
          'candidate',
          'owner',
          'createdAt',
        ],
      },
    },
  },
};
