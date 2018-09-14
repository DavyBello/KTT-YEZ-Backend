const { JobTC, IndustryTC } = require('../../composers');

module.exports = () => {
  JobTC.addRelation('industries', {
    resolver: () => IndustryTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: source => source.industries,
    },
    projection: { industries: true },
  });
  // JobTC.addRelation('search', {
  //     resolver: () => JobTC.getResolver('findMany'),
  //     args: {
  //       filter: (source) => ({ _ids: source.jobs}),
  //     },
  //     projection: { jobs: true },
  //   }
  // );
};
