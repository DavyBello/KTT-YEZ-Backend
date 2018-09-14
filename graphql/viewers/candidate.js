const { CandidateTC, ViewerCandidateTC } = require('../composers');

const ViewerCandidateTCFields = {
  me: CandidateTC.getType(),
};
ViewerCandidateTC.addFields(ViewerCandidateTCFields);

ViewerCandidateTC.addResolver({
  kind: 'query',
  name: 'candidateAccess',
  type: ViewerCandidateTC,
  resolve: ({ context: { viewer } }) => ({ me: viewer }),
});
