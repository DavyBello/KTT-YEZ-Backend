module.exports = {
  kind: 'mutation',
  name: 'sendUserActivationLink',
  description: 'Send account activation link to user email',
  type: `type SendActivationLinkPayload {
		status: String!
		email: String!
	}`,
  resolve: async ({ sourceUser }) => {
    if (sourceUser.handleActivationLinkEmail) {
      try {
        await sourceUser.handleActivationLinkEmail();
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
