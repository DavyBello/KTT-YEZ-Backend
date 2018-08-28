const keystone = require('keystone');

const User = keystone.list('User').model;

// activateAccount resolver for user
module.exports = {
  kind: 'mutation',
  name: 'sendPasswordResetLink',
  description: 'Send password reset link to user email',
  args: {
    input: `input ResetPasswordLinkInput {
      email: String!
    }`,
  },
  type: `type ResetPasswordLinkPayload {
		status: String!
		email: String!
	}`,
  resolve: async ({ args }) => {
    const { input: { email } } = args;
    const user = await User.findOne({ email });
    if (user) {
      if (user.sendPasswordResetLink) {
        try {
          await user.sendPasswordResetLink();
          return ({
            status: 'success',
            email: user.email,
          });
        } catch (e) {
          return Promise.reject(e);
        }
      } else {
        return Promise.reject(Error('this user cannot run this mutation'));
      }
    }
    return Promise.reject(Error('user not found'));
  },
};
