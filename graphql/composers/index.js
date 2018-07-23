const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
const { GQC, TypeComposer, InputTypeComposer  } = require('graphql-compose');

/**
* Mongoose Models
*/
//User models
const User = keystone.list('User').model;
const Candidate = keystone.list('Candidate').model;
// const Company = keystone.list('Company').model;
// const CenterManager = keystone.list('CenterManager').model;

// const Poll = keystone.list('Poll').model;
// const PollVote = keystone.list('PollVote').model;
// const LocalGovernment = keystone.list('LocalGovernment').model;
// const State = keystone.list('State').model;
// const CandidateDocument = keystone.list('CandidateDocument').model;
// const JobExperience = keystone.list('JobExperience').model;
// const Education = keystone.list('Education').model;
// const CompanyMessage = keystone.list('CompanyMessage').model;
// const Certificate = keystone.list('Certificate').model;
// const Referee = keystone.list('Referee').model;
// const Industry = keystone.list('Industry').model;
// const Job = keystone.list('Job').model;
// const CaseFile = keystone.list('CaseFile').model;

/**
* Config
*/
const noviewUserFields = ['password', 'passwordVersion']
const noeditUserFields = ['password', 'passwordVersion']
const UserTCOptions = {
  fields:{
    remove: [...noviewUserFields]
  }
};
const CandidateTCOptions = {
  fields:{
    remove: [...noviewUserFields]
  },
  resolvers:{
    updateById: {
      record: {
        removeFields: [
          ...noeditUserFields, 'phone', 'result',
          'category', 'isVerified', 'isEmployed',
        ]
      }
    }
  }
};
// const CenterManagerTCOptions = {
//   fields:{
//     remove: [
//       'password', 'passwordVersion', 'isVerified', 'isEmployed',
//        'documentsUploaded', 'caseFile'
//      ]
//   },
//   resolvers:{
//     updateById: {
//       record: {
//         removeFields: [
//           'phone', 'result', 'category', 'password',
//           'passwordVersion', 'isVerified', 'isEmployed',
//           'documentsUploaded', 'caseFile', 'referees',
//           'experience', 'education', 'certificates', 'documentsUploaded'
//         ]
//       }
//     }
//   }
// };
// const CompanyTCOptions = {
//   fields:{
//     remove: [
//       'password', 'passwordVersion','createdAt', 'createdBy', 'updatedAt',
//        'updatedBy'
//     ]
//   },
//   resolvers:{
//     updateById: {
//       record: {
//         removeFields: [
//           'jobs', 'cacRegNo', 'password', 'passwordVersion',
//           'isVerified', 'isActive'
//         ]
//       }
//     }
//   }
// };
// const CaseFileTCOptions = {
//   resolvers:{
//     createOne: {
//       record: {
//         removeFields: [
//           'fileNumber', 'authorManager', 'candidate', 'owner',
//           'createdAt',
//         ]
//       }
//     }
//   }
// };

/**
* Exports
*/
const UserTC = exports.UserTC = composeWithMongoose(User, UserTCOptions);
const CandidateTC = exports.CandidateTC = composeWithMongoose(Candidate, CandidateTCOptions);
// const CompanyTC = exports.CompanyTC = composeWithMongoose(Company, CompanyTCOptions);
// const CenterManagerTC = exports.CenterManagerTC = composeWithMongoose(CenterManager, CenterManagerTCOptions);
// const RefereeTC = exports.RefereeTC = composeWithMongoose(Referee);
// const PollTC = exports.PollTC = composeWithMongoose(Poll);
// const PollVoteTC = exports.PollVoteTC = composeWithMongoose(PollVote);
// const LocalGovernmentTC = exports.LocalGovernmentTC = composeWithMongoose(LocalGovernment);
// const StateTC = exports.StateTC = composeWithMongoose(State);
// const JobExperienceTC = exports.JobExperienceTC = composeWithMongoose(JobExperience);
// const EducationTC = exports.EducationTC = composeWithMongoose(Education);
// const CertificateTC = exports.CertificateTC = composeWithMongoose(Certificate);
// const CandidateDocumentTC = exports.CandidateDocumentTC = composeWithMongoose(CandidateDocument);
// const CompanyMessageTC = exports.CompanyMessageTC = composeWithMongoose(CompanyMessage);
// const IndustryTC = exports.IndustryTC = composeWithMongoose(Industry);
// const JobTC = exports.JobTC = composeWithMongoose(Job);
// const CaseFileTC = exports.CaseFileTC = composeWithMongoose(CaseFile, CaseFileTCOptions);

/**
* Add token(JWT) to user models for login
*/
// UserTC.addFields({token: 'String'})
// CandidateTC.addFields({token: 'String'})
// CompanyTC.addFields({token: 'String'})
// CenterManagerTC.addFields({token: 'String'})


/**
* Viewer Fields for authentication and authorization
*/
const ViewerCandidateTC = exports.ViewerCandidateTC = GQC.getOrCreateTC('ViewerCandidate');
// const ViewerCompanyTC = exports.ViewerCompanyTC = GQC.getOrCreateTC('ViewerCompany');
// const ViewerCenterManagerTC = exports.ViewerCenterManagerTC = GQC.getOrCreateTC('ViewerCenterManager');
