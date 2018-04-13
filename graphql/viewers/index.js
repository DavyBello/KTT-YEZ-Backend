const candidateViewer = require('./candidate');
const companyViewer = require('./company');

const addViewers = module.exports = () => {
  candidateViewer();
  companyViewer();
};
