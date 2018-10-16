module.exports = {
  type: 'Boolean!',
  resolve: async source => source.basicProfileStatus.status,
};
