const stateRel = require('./State');
const pollRel = require('./Poll');
const candidateRel = require('./Candidate');

const addRelationships = module.exports = () => {
  stateRel();
  pollRel();
  candidateRel();
};
