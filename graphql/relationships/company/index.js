const { CompanyTC, JobTC, IndustryTC } = require('../../composers');

module.exports = () => {
  CompanyTC.addRelation('jobs', {
    resolver: () => JobTC.getResolver('findMany'),
    prepareArgs: {
      filter: source => ({ companyId: source._id }),
    },
  });
  CompanyTC.addRelation('industries', {
    resolver: () => IndustryTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: source => source.industries,
    },
    projection: { industries: true },
  });
  CompanyTC.addRelation('jobsPagination', {
    resolver: () => JobTC.getResolver('pagination'),
    prepareArgs: {
      filter: source => ({ companyId: source._id }),
    },
  });
  // CompanyTC.addRelation('jobsSearch', {
  //     resolver: () => JobTC.getResolver('findMany'),
  //     args: {
  //       filter: (source) => ({ _ids: source.jobs}),
  //     },
  //     projection: { jobs: true },
  //   }
  // );
};
