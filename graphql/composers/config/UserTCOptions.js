const { noviewUserFields } = require('./fields');

module.exports = {
  fields: {
    remove: [...noviewUserFields],
  },
};
