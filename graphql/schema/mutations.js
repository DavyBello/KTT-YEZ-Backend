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
  // UserTC,
  CandidateTC,
  JobExperienceTC,
  EducationTC,
  CertificateTC,
  RefereeTC,
  // PollTC,
  // PollVoteTC,
  // LocalGovernmentTC,
  // StateTC,
  // CandidateTC,
  // CandidateDocumentTC,
  // JobTC,
  // CompanyTC,
  // CompanyMessageTC,
  // IndustryTC,
  // CaseFileTC,
  // CenterManagerTC,
} = require('../composers');

module.exports = {
  loginCandidate: CandidateTC.getResolver('loginWithPhone'),
  candidateCreateAccount: CandidateTC.getResolver('createAccount'),
  // loginCenterManager: CenterManagerTC.get('$loginWithPhone'),
  // // signUpCenterManager: CenterManagerTC.get('$signUp'),
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
    // deleteReferee: deleteDocumentWithIdReference({ TC: RefereeTC, refPath: 'candidateId' }),
  }),
  // ...authAccess('Company', {
  // 	companyUpdateById:updateSelf(CompanyTC),
  // 	addJob: createSelfRelationship( 'jobs', JobTC),
  // 	updateJob: updateSelfRelationship( 'jobs', JobTC),
  // 	deleteJob: deleteSelfRelationship( 'jobs', JobTC),
  // 	createCompanyMessage: CompanyMessageTC.get('$createOne')
  // 	// addJobExperience: createSelfRelationship( 'experience', JobExperienceTC),
  // 	// updateJobExperience: updateSelfRelationship( 'experience', JobExperienceTC),
  // 	// deleteJobExperience: deleteSelfRelationship( 'experience', JobExperienceTC),
  // }),
  // ...authAccess('CenterManager', {
  // 	addCandidateDocument: createManagedRelationship( 'documentsUploaded', CandidateDocumentTC, 'Candidate'),
  // 	deleteCandidateDocument: deleteManagedRelationship( 'documentsUploaded', CandidateDocumentTC, 'Candidate'),
  // 	addCandidateCaseFile: createManagedRelationship( 'caseFiles', CaseFileTC, 'Candidate'),
  // 	// addCandidateDocument: createSelfRelationship( 'referees', CandidateDocumentTC),
  // 	// deleteCandidateDocument: deleteSelfRelationship( 'referees', CandidateDocumentTC),
  // })
};
