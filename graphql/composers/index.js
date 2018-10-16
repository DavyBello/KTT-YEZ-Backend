const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
const { schemaComposer } = require('graphql-compose');

/**
 * Mongoose Models
 */
// User models
const User = keystone.list('User').model;
const Candidate = keystone.list('Candidate').model;
const Company = keystone.list('Company').model;
const CenterManager = keystone.list('CenterManager').model;

// const Poll = keystone.list('Poll').model;
// const PollVote = keystone.list('PollVote').model;
const LocalGovernment = keystone.list('LocalGovernment').model;
const State = keystone.list('State').model;

const CandidateDocument = keystone.list('CandidateDocument').model;
const JobExperience = keystone.list('JobExperience').model;
const Education = keystone.list('Education').model;
const Certificate = keystone.list('Certificate').model;
const Referee = keystone.list('Referee').model;
const Notification = keystone.list('Notification').model;

// const CompanyMessage = keystone.list('CompanyMessage').model;
const Industry = keystone.list('Industry').model;
const Job = keystone.list('Job').model;
const JobCenter = keystone.list('JobCenter').model;

const CaseFile = keystone.list('CaseFile').model;
const CandidateEnquiry = keystone.list('CandidateEnquiry').model;

const Post = keystone.list('Post').model;
const PostCategory = keystone.list('PostCategory').model;
const Event = keystone.list('Event').model;

/**
 * Config
 */
const {
  UserTCOptions,
  CandidateTCOptions,
  JobExperienceTCOptions,
  EducationTCOptions,
  CertificateTCOptions,
  RefereeTCOptions,
  CenterManagerTCOptions,
  CompanyTCOptions,
  CaseFileTCOptions,
  CandidateEnquiryTCOptions,
  PublicJobTCOptions,
  JobCenterTCOptions,
} = require('./config');

const UserTC = composeWithMongoose(User, UserTCOptions);
const CandidateTC = composeWithMongoose(Candidate, CandidateTCOptions);
const CompanyTC = composeWithMongoose(Company, CompanyTCOptions);
const CenterManagerTC = composeWithMongoose(CenterManager, CenterManagerTCOptions);

// const PollTC = composeWithMongoose(Poll);
// const PollVoteTC = composeWithMongoose(PollVote);

const LocalGovernmentTC = composeWithMongoose(LocalGovernment);
const StateTC = composeWithMongoose(State);

const JobExperienceTC = composeWithMongoose(JobExperience, JobExperienceTCOptions);
const EducationTC = composeWithMongoose(Education, EducationTCOptions);
const CertificateTC = composeWithMongoose(Certificate, CertificateTCOptions);
const RefereeTC = composeWithMongoose(Referee, RefereeTCOptions);
const CandidateDocumentTC = composeWithMongoose(CandidateDocument);
const CaseFileTC = composeWithMongoose(CaseFile, CaseFileTCOptions);
const CandidateEnquiryTC = composeWithMongoose(CandidateEnquiry, CandidateEnquiryTCOptions);
const NotificationTC = composeWithMongoose(Notification);

// const CompanyMessageTC = composeWithMongoose(CompanyMessage);
const IndustryTC = composeWithMongoose(Industry);
const JobTC = composeWithMongoose(Job);

// PUBLIC TYPES
const PublicJobTC = composeWithMongoose(Job, PublicJobTCOptions);
const JobCenterTC = composeWithMongoose(JobCenter, JobCenterTCOptions);
const PostTC = composeWithMongoose(Post);
const PostCategoryTC = composeWithMongoose(PostCategory);
const EventTC = composeWithMongoose(Event);

/**
 * Viewer Fields for authentication and authorization
 */
const ViewerCandidateTC = schemaComposer.getOrCreateTC('ViewerCandidate');
const ViewerCompanyTC = schemaComposer.getOrCreateTC('ViewerCompany');
const ViewerCenterManagerTC = schemaComposer.getOrCreateTC('ViewerCenterManager');

const PlaceHolderTC = schemaComposer.getOrCreateTC('PlaceHolder');

/**
 * Exports
 */
module.exports = {
  PlaceHolderTC,
  UserTC,
  CandidateTC,
  CompanyTC,
  CenterManagerTC,

  LocalGovernmentTC,
  StateTC,

  ViewerCandidateTC,
  CandidateDocumentTC,
  JobExperienceTC,
  EducationTC,
  CertificateTC,
  RefereeTC,
  CandidateEnquiryTC,
  NotificationTC,

  ViewerCompanyTC,
  IndustryTC,
  JobTC,
  // CompanyMessageTC,

  ViewerCenterManagerTC,
  CaseFileTC,

  JobCenterTC,
  PublicJobTC,
  PostTC,
  PostCategoryTC,
  EventTC,
};
