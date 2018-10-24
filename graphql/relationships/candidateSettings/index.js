const {
  ScholarshipNotificationTC,
  GeneralNotificationTC,
  JobAlertNotificationTC,
  CandidateSettingsTC,
} = require('../../composers');
const wrapWithDefaultValue = require('../../logic/common/wrapWithDefaultValue');


CandidateSettingsTC.addRelation('scholarshipNotification', {
  resolver: () => ScholarshipNotificationTC.getResolver('findOne'),
  prepareArgs: {
    filter: source => ({ userId: source.candidateId }),
  },
  projection: { candidateId: true },
});

CandidateSettingsTC.addRelation('generalNotification', {
  resolver: () => wrapWithDefaultValue({
    resolver: GeneralNotificationTC.getResolver('findOne'),
    value: {
      newBlogPosts: true,
      newEvents: true,
    },
  }),
  prepareArgs: {
    filter: source => ({ userId: source.candidateId }),
  },
  projection: { _id: true },
});

CandidateSettingsTC.addRelation('jobAlertNotification', {
  resolver: () => JobAlertNotificationTC.getResolver('findOne'),
  prepareArgs: {
    filter: source => ({ userId: source.candidateId }),
  },
  projection: { _id: true },
});
