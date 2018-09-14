const { PublicJobTC, CompanyTC, IndustryTC } = require('../../composers');

module.exports = () => {
  PublicJobTC.addRelation('company', {
    resolver: () => CompanyTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.companyId,
    },
    projection: { companyId: true },
  });
  PublicJobTC.addRelation('industries', {
    resolver: () => IndustryTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: source => source.industries,
    },
    projection: { industries: true },
  });
  // PublicJobTC.addRelation('search', {
  //     resolver: () => JobTC.getResolver('findMany'),
  //     args: {
  //       filter: (source) => ({ _ids: source.jobs}),
  //     },
  //     projection: { jobs: true },
  //   }
  // );
};
