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

  // PollTC,
  // PollVoteTC,

  CompanyTC,
  JobTC,
  // CompanyMessageTC,

  // CenterManagerTC,
  // CaseFileTC,
} = require('../composers');

module.exports = {
  loginCandidate: CandidateTC.getResolver('loginWithPhone'),
  candidateCreateAccount: CandidateTC.getResolver('createAccount'),
  // loginCenterManager: CenterManagerTC.get('$loginWithPhone'),
  // signUpCenterManager: CenterManagerTC.get('$signUp'),
  // loginCompany: CompanyTC.get('$loginWithEmail'),
  // signUpCompany: CompanyTC.get('$signUp'),
  ...authAccess({ scope: 'Candidate' }, {
    candidateUpdateById: updateSelf({ TC: CandidateTC }),
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
    deleteReferee: deleteDocumentWithIdReference({ TC: RefereeTC, refPath: 'candidateId' }),
  }),
  ...authAccess({ scope: 'Company' }, {
    companyUpdateById: updateSelf({ TC: CompanyTC }),
    companyAddJob: createDocumentWithIdReference({ TC: JobTC, refPath: 'companyId' }),
    companyUpdateJob: updateDocumentWithIdReference({ TC: JobTC, refPath: 'companyId' }),
    companydeleteJob: deleteDocumentWithIdReference({ TC: JobTC, refPath: 'companyId' }),
  }),
  // ...authAccess('CenterManager', {
  // 	addCandidateDocument:
  //    createManagedRelationship( 'documentsUploaded', CandidateDocumentTC, 'Candidate'),
  // 	deleteCandidateDocument:
  //    deleteManagedRelationship( 'documentsUploaded', CandidateDocumentTC, 'Candidate'),
  // 	addCandidateCaseFile: createManagedRelationship( 'caseFiles', CaseFileTC, 'Candidate'),
  // 	// addCandidateDocument: createSelfRelationship( 'referees', CandidateDocumentTC),
  // 	// deleteCandidateDocument: deleteSelfRelationship( 'referees', CandidateDocumentTC),
  // })
};
