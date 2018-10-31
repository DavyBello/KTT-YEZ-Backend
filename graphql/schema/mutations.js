// Get logic middleware
const {
  authAccess,
} = require('../logic/authentication');

const {
// 	isSelf,
  updateSelf,
  createDocumentWithIdReference,
  updateDocumentWithIdReference,
  deleteDocumentWithIdReference,
} = require('../logic/common');

const {
  // StateTC,
  // LocalGovernmentTC,

  CandidateTC,
  JobExperienceTC,
  EducationTC,
  CertificateTC,
  RefereeTC,
  // CandidateDocumentTC,
  CandidateEnquiryTC,

  // PollTC,
  // PollVoteTC,

  CompanyTC,
  JobTC,
  // CompanyMessageTC,

  CenterManagerTC,
  // CaseFileTC,
} = require('../composers');

module.exports = {
  loginCandidate: CandidateTC.getResolver('loginWithEmail'),
  candidateCreateAccount: CandidateTC.getResolver('createAccount'),
  loginCompany: CompanyTC.getResolver('loginWithEmail'),
  companyCreateAccount: CompanyTC.getResolver('createAccount'),
  loginCenterManager: CenterManagerTC.getResolver('loginWithEmail'),
  centerManagerCreateAccount: CenterManagerTC.getResolver('createAccount'),
  ...authAccess({ scope: 'Candidate' }, {
    candidateUpdateSelf: updateSelf({ TC: CandidateTC }),
    addJobExperience: createDocumentWithIdReference({ TC: JobExperienceTC, refPath: 'candidateId' }),
    updateJobExperience: updateDocumentWithIdReference({ TC: JobExperienceTC, refPath: 'candidateId' }),
    deleteJobExperience: deleteDocumentWithIdReference({ TC: JobExperienceTC, refPath: 'candidateId' }),
    addEducation: createDocumentWithIdReference({ TC: EducationTC, refPath: 'candidateId' }),
    updateEducation: updateDocumentWithIdReference({ TC: EducationTC, refPath: 'candidateId' }),
    deleteEducation: deleteDocumentWithIdReference({ TC: EducationTC, refPath: 'candidateId' }),
    addCertificate: createDocumentWithIdReference({ TC: CertificateTC, refPath: 'candidateId' }),
    updateCertificate: updateDocumentWithIdReference({ TC: CertificateTC, refPath: 'candidateId' }),
    deleteCertificate: deleteDocumentWithIdReference({ TC: CertificateTC, refPath: 'candidateId' }),
    addReferee: createDocumentWithIdReference({ TC: RefereeTC, refPath: 'candidateId' }),
    updateReferee: updateDocumentWithIdReference({ TC: RefereeTC, refPath: 'candidateId' }),
    // deleteReferee: deleteDocumentWithIdReference({ TC: RefereeTC, refPath: 'candidateId' }),
    deleteReferee: CandidateTC.getResolver('softDeleteReferee'),
    candidateCreateEnquiry: CandidateEnquiryTC.getResolver('createEnquiry'),
  }),
  ...authAccess({ scope: 'Company' }, {
    companyUpdateSelf: updateSelf({ TC: CompanyTC }),
    companyAddJob: CompanyTC.getResolver('addJob'),
    companyUpdateJob: updateDocumentWithIdReference({ TC: JobTC, refPath: 'companyId' }),
    companydeleteJob: deleteDocumentWithIdReference({ TC: JobTC, refPath: 'companyId' }),
  }),
  ...authAccess({ scope: 'CenterManager' }, {
    managerUpdateSelf: updateSelf({ TC: CenterManagerTC }),
    // addCandidateDocument: createManagedRelationship({
    //   field: 'documentsUploaded',
    //   TC: CandidateDocumentTC,
    //   managedModelType: 'Candidate',
    // }),
  // 	deleteCandidateDocument:
  //  deleteManagedRelationship( 'documentsUploaded', CandidateDocumentTC, 'Candidate'),
  // 	addCandidateCaseFile: createManagedRelationship( 'caseFiles', CaseFileTC, 'Candidate'),
  }),
};
