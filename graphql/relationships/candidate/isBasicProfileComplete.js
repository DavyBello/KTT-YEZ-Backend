const keystone = require('keystone');

module.exports = {
  type: 'Boolean!',
  resolve: async source => source.basicProfileStatus.status,
};
