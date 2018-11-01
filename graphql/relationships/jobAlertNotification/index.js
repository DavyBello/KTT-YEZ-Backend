const {
  JobAlertNotificationTC,
  IndustryTC,
} = require('../../composers');
// const wrapWithDefaultValue = require('../../logic/common/wrapWithDefaultValue');


JobAlertNotificationTC.addRelation('industries', {
  resolver: () => IndustryTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.industries,
  },
  projection: { industries: true },
});
