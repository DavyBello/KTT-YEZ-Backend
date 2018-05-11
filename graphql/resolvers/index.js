const candidateResolvers = require('./candidate')
const companyResolvers = require('./company')
const CenterManagerResolvers = require('./CenterManager')

module.exports = addResolvers = () => {
  candidateResolvers();
  companyResolvers();
  CenterManagerResolvers();
}
