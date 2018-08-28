const { UserTC } = require('../../composers');

// loginWithEmail resolver for user
module.exports = {
  kind: 'mutation',
  name: 'changePassword',
  description: 'login a user',
  args: {
    input: `input ResetPasswordInput {
      oldPassword: String!
      newPassword: String!
		}`,
  },
  type: UserTC,
  resolve: async ({ args, sourceUser }) => {
    const { input: { oldPassword, newPassword } } = args;
    if (sourceUser) {
      try {
        // validate password
        return new Promise((resolve, reject) => {
          sourceUser._.password.compare(oldPassword, async (err, isMatch) => {
            if (err) {
              reject(err);
            }
            if (isMatch) {
              // change password
              sourceUser.password = newPassword;
              const user = await sourceUser.save();
              resolve(user);
            }
            reject(Error('wrong password'));
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(Error('no user in context not found'));
  },
};
