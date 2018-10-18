const handleActivationLinkEmail = require('./emails/handleActivationLinkEmail');
const sendPasswordResetLink = require('./emails/sendPasswordResetLink');

const encryptPasswordVersion = require('./auth/encryptPasswordVersion');
const signToken = require('./auth/signToken');
const decodeToken = require('./auth/decodeToken');
const getUser = require('./auth/getUser');

module.exports = {
  handleActivationLinkEmail,
  sendPasswordResetLink,
  signToken,
  decodeToken,
  getUser,
  encryptPasswordVersion,
};
