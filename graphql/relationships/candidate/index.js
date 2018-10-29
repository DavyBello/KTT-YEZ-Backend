const {
  CandidateTC,
  JobExperienceTC,
  EducationTC,
  CertificateTC,
  CandidateDocumentTC,
  RefereeTC,
  NotificationRecipientTC,
  // CaseFileTC,
  CandidateSettingsTC,
} = require('../../composers');

CandidateTC.addRelation('experiences', {
  resolver: () => JobExperienceTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('education', {
  resolver: () => EducationTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('certificates', {
  resolver: () => CertificateTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('referees', {
  resolver: () => RefereeTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id, d: false }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('documents', {
  resolver: () => CandidateDocumentTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
// CandidateTC.addRelation('caseFiles', {
//   resolver: () => CaseFileTC.getResolver('findMany'),
//   prepareArgs: {
//     filter: source => ({ candidateId: source._id }),
//   },
//   projection: { _id: true },
// });
CandidateTC.addRelation('documentsPagination', {
  resolver: () => CandidateDocumentTC.getResolver('pagination'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('notificationsConnection', {
  resolver: () => NotificationRecipientTC.getResolver('connection')
    .addSortArg({
      name: 'CREATEDAT_DESC',
      value: { createdAt: -1 },
      description: 'Sort By most recent',
    }).wrapResolve(next => async rp => next(rp)),
  prepareArgs: {
    filter: source => ({ userId: source._id }),
    sort: 'CREATEDAT_DESC',
  },
  projection: { _id: true, createdAt: true },
});
CandidateTC.addFields({
  isBasicProfileComplete: require('./isBasicProfileComplete'),
  profilePercentage: require('./profilePercentage'),
  settings: {
    type: CandidateSettingsTC.getType(),
    resolve: async source => ({ candidateId: source._id }),
  },
});
