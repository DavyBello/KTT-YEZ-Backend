const stateRel = require('./state');
const pollRel = require('./poll');
const candidateRel = require('./candidate');

const addRelationships = module.exports = () => {
  stateRel();
  pollRel();
  candidateRel();
};
