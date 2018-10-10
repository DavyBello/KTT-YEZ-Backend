const keystone = require('keystone');

module.exports = {
  type: 'Float',
  resolve: async source => source.getProfilePercent()
  ,
};
