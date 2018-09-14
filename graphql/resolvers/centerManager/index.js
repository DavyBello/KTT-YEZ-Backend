const { CenterManagerTC } = require('../../composers');

CenterManagerTC.addResolver(require('./createAccount'));
CenterManagerTC.addResolver(require('./loginWithEmail'));
