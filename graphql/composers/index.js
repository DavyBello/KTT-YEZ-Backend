const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
const { GQC } = require('graphql-compose');

/**
* Mongoose Models
*/
// User models
const User = keystone.list('User').model;
const Candidate = keystone.list('Candidate').model;
// const Company = keystone.list('Company').model;
// const CenterManager = keystone.list('CenterManager').model;

// const Poll = keystone.list('Poll').model;
// const PollVote = keystone.list('PollVote').model;
const LocalGovernment = keystone.list('LocalGovernment').model;
const State = keystone.list('State').model;
const CandidateDocument = keystone.list('CandidateDocument').model;
const JobExperience = keystone.list('JobExperience').model;
const Education = keystone.list('Education').model;
const Certificate = keystone.list('Certificate').model;
// const Referee = keystone.list('Referee').model;
// const CompanyMessage = keystone.list('CompanyMessage').model;
// const Industry = keystone.list('Industry').model;
// const Job = keystone.list('Job').model;
const CaseFile = keystone.list('CaseFile').model;

/**
* Config
*/
const {
  UserTCOptions,
  CandidateTCOptions,
  // CenterManagerTCOptions,
  // CompanyTCOptions,
  CaseFileTCOptions,
} = require('./config');

const UserTC = composeWithMongoose(User, UserTCOptions);
const CandidateTC = composeWithMongoose(Candidate, CandidateTCOptions);

// const CompanyTC = composeWithMongoose(Company, CompanyTCOptions);
// const CenterManagerTC = composeWithMongoose(CenterManager, CenterManagerTCOptions);
// const PollTC = composeWithMongoose(Poll);
// const PollVoteTC = composeWithMongoose(PollVote);
const LocalGovernmentTC = composeWithMongoose(LocalGovernment);
const StateTC = composeWithMongoose(State);
const CandidateDocumentTC = composeWithMongoose(CandidateDocument);
const JobExperienceTC = composeWithMongoose(JobExperience);
const EducationTC = composeWithMongoose(Education);
const CertificateTC = composeWithMongoose(Certificate);
// const RefereeTC = composeWithMongoose(Referee);
// const CompanyMessageTC = composeWithMongoose(CompanyMessage);
// const IndustryTC = composeWithMongoose(Industry);
// const JobTC = composeWithMongoose(Job);
const CaseFileTC = composeWithMongoose(CaseFile, CaseFileTCOptions);

/**
* Viewer Fields for authentication and authorization
*/
const ViewerCandidateTC = GQC.getOrCreateTC('ViewerCandidate');
// const ViewerCompanyTC = GQC.getOrCreateTC('ViewerCompany');
// const ViewerCenterManagerTC = GQC.getOrCreateTC('ViewerCenterManager');

const PlaceHolderTC = GQC.getOrCreateTC('PlaceHolder');

/**
* Exports
*/
module.exports = {
  PlaceHolderTC,
  UserTC,
  CandidateTC,
  ViewerCandidateTC,
  LocalGovernmentTC,
  StateTC,
  CandidateDocumentTC,
  JobExperienceTC,
  EducationTC,
  CertificateTC,
  // RefereeTC,
  // CompanyMessageTC,
  CaseFileTC,
};
