const { StateTC, LocalGovernmentTC } = require('../../composers');

StateTC.addRelation('locals', {
  resolver: () => LocalGovernmentTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ stateId: source._id }),
  },
});
