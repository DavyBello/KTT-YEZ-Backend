module.exports = {
  sendActivationLink: user => user.getActivationLinkEmail().send(),
};
