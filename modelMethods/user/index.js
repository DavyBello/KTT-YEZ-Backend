const encryptPasswordVersion = require('./encryptPasswordVersion');
const handleActivationLinkEmail = require('./handleActivationLinkEmail');
const sendPasswordResetLink = require('./sendPasswordResetLink');
const signToken = require('./signToken');
const decodeToken = require('./decodeToken');
const getUser = require('./getUser');

module.exports = {
  handleActivationLinkEmail,
  sendPasswordResetLink,
  signToken,
  decodeToken,
  getUser,
  encryptPasswordVersion,
};
