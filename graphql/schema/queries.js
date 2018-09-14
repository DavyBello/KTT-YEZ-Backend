// Get logic middleware
const {
  authAccess,
} = require('../logic/authentication');

// const {
// 	isSelf,
// 	findSelfRelationship,
// } = require('../logic/common');

const {
  UserTC,
  ViewerCandidateTC,
  PostTC,
  // PollTC,
  // PollVoteTC,
  // LocalGovernmentTC,
  // StateTC,
  // CandidateTC,
  // CandidateDocumentTC,
  // JobExperienceTC,
  // EducationTC,
  // CertificateTC,
  // RefereeTC,
  // CompanyTC,
  // CompanyMessageTC,
  ViewerCompanyTC,
  IndustryTC,
  // JobTC,
  // CaseFileTC,
  // CenterManagerTC,
  // ViewerCenterManagerTC,
  PublicJobTC,
} = require('../composers');


// Add fields and resolvers to rootQuery
module.exports = {
  posts: PostTC.getResolver('findMany'),
  jobs: PublicJobTC.getResolver('findMany'),
  ...authAccess({ scope: 'Candidate' }, {
    candidateIsAuthenticated: UserTC.getResolver('isAuthenticated'),
    viewerCandidate: ViewerCandidateTC.getResolver('candidateAccess'),
  }),
  ...authAccess({ scope: 'Company' }, {
    viewerCompany: ViewerCompanyTC.getResolver('companyAccess'),
    industryMany: IndustryTC.getResolver('findMany'),
    // jobById: isSelf(JobTC, '$findById'),
  }),
  // ...authAccess('CenterManager', {
  // 	viewerCenterManager: ViewerCenterManagerTC.get('$centerManagerAccess'),
  // 	managerCandidateById: CandidateTC.get('$findById'),
  // 	managerCandidateMany: CandidateTC.get('$findMany'),
  // 	managerCandidatePagination: CandidateTC.get('$pagination')
  // }),
  currentTime: {
    type: 'Date',
    resolve: () => new Date().toISOString(),
  },
};
