const candidateResolvers = require('./candidate')
const companyResolvers = require('./company')

module.exports = addResolvers = () => {
  candidateResolvers();
  companyResolvers();
}
