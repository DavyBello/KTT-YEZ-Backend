const { CompanyTC } = require('../../composers');

CompanyTC.addResolver(require('./createAccount'));
CompanyTC.addResolver(require('./loginWithEmail'));
CompanyTC.addResolver(require('./addJob'));
