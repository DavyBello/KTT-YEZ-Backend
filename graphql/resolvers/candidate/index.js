const { CandidateTC } = require('../../composers');

CandidateTC.addResolver(require('./createAccount'));
CandidateTC.addResolver(require('./loginWithEmail'));
CandidateTC.addResolver(require('./softDeleteReferee'));
