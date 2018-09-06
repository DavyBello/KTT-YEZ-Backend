const encryptPasswordVersion = require('./encryptPasswordVersion');
const sendActivationLink = require('./sendActivationLink');
const sendPasswordResetLink = require('./sendPasswordResetLink');
const signToken = require('./signToken');
const decodeToken = require('./decodeToken');
const getUser = require('./getUser');

module.exports = {
  sendActivationLink,
  sendPasswordResetLink,
  signToken,
  decodeToken,
  getUser,
  encryptPasswordVersion,
};
