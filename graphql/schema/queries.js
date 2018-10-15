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
  CandidateTC,
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
  JobCenterTC,
  // CaseFileTC,
  // CenterManagerTC,
  ViewerCenterManagerTC,
  PublicJobTC,
} = require('../composers');


// Add fields and resolvers to rootQuery
module.exports = {
  posts: PostTC.getResolver('findMany'),
  postsConnection: PostTC.getResolver('connection'),
  jobs: PublicJobTC.getResolver('findMany'),
  jobsConnection: PublicJobTC.getResolver('connection'),
  jobCenters: JobCenterTC.getResolver('findMany'),
  jobCentersConnection: JobCenterTC.getResolver('connection'),
  ...authAccess({ scope: 'Candidate' }, {
    candidateIsAuthenticated: UserTC.getResolver('isAuthenticated'),
    viewerCandidate: ViewerCandidateTC.getResolver('candidateAccess'),
  }),
  ...authAccess({ scope: 'Company' }, {
    viewerCompany: ViewerCompanyTC.getResolver('companyAccess'),
    industryMany: IndustryTC.getResolver('findMany'),
    // jobById: isSelf(JobTC, '$findById'),
  }),
  ...authAccess({ scope: 'CenterManager' }, {
    viewerCenterManager: ViewerCenterManagerTC.get('$centerManagerAccess'),
    managerCandidateById: CandidateTC.get('$findById'),
    managerCandidatePagination: CandidateTC.get('$pagination'),
  }),
  currentTime: {
    type: 'Date',
    resolve: () => new Date().toISOString(),
  },
};
