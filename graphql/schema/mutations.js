// Get logic middleware
const {
  authAccess,
} = require('../logic/authentication');

const {
// 	isSelf,
  updateSelf,
  createDocumentWithIdReference,
} = require('../logic/common');

const {
  // UserTC,
  CandidateTC,
  JobExperienceTC,
  // PollTC,
  // PollVoteTC,
  // LocalGovernmentTC,
  // StateTC,
  // CandidateTC,
  // CandidateDocumentTC,
  // JobTC,
  // EducationTC,
  // CertificateTC,
  // RefereeTC,
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
  // 	updateJobExperience: updateSelfRelationship( 'experience', JobExperienceTC),
  // 	deleteJobExperience: deleteSelfRelationship( 'experience', JobExperienceTC),
  // 	addEducation: createSelfRelationship( 'education', EducationTC),
  // 	updateEducation: updateSelfRelationship( 'education', EducationTC),
  // 	deleteEducation: deleteSelfRelationship( 'education', EducationTC),
  // 	addCertificate: createSelfRelationship( 'certificates', CertificateTC),
  // 	updateCertificate: updateSelfRelationship( 'certificates', CertificateTC),
  // 	deleteCertificate: deleteSelfRelationship( 'certificates', CertificateTC),
  // 	addReferee: createSelfRelationship( 'referees', RefereeTC),
  // 	updateReferee: updateSelfRelationship( 'referees', RefereeTC),
  // 	deleteReferee: deleteSelfRelationship( 'referees', RefereeTC),
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
