const getActivationLinkEmail = require('./emails/getActivationLinkEmail');
const getPasswordResetLinkEmail = require('./emails/getPasswordResetLinkEmail');

const encryptPasswordVersion = require('./auth/encryptPasswordVersion');
const signToken = require('./auth/signToken');
const decodeToken = require('./auth/decodeToken');
const getUser = require('./auth/getUser');

module.exports = {
  getActivationLinkEmail,
  getPasswordResetLinkEmail,
  signToken,
  decodeToken,
  getUser,
  encryptPasswordVersion,
};
