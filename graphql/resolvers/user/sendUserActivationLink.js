module.exports = {
  kind: 'mutation',
  name: 'sendUserActivationLink',
  description: 'Send account activation link to user email',
  type: `type SendActivationLinkPayload {
		status: String!
		email: String!
	}`,
  resolve: async ({ sourceUser }) => {
    if (sourceUser.getActivationLinkEmail) {
      try {
        await sourceUser.getActivationLinkEmail().send();
        return ({
          status: 'success',
          email: sourceUser.email,
        });
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      return Promise.reject(Error('this user cannot run this mutation'));
    }
  },
};
