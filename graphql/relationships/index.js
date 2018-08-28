const stateRel = require('./state');
// const pollRel = require('./poll');
const candidateRel = require('./candidate');
// const companyRel = require('./company');

module.exports = () => {
  stateRel();
  // pollRel();
  candidateRel();
  // companyRel();
};
