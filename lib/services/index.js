const createNotification = require('./createNotification');

module.exports = {
  sendActivationLink: user => user.getActivationLinkEmail().send(),
  createNotification,
};
