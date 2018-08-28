const keystone = require('keystone');

const User = keystone.list('User').model;

module.exports = {
  kind: 'mutation',
  name: 'loginWithEmail',
  description: 'login a user',
  args: {
    input: `input LoginWithEmailInput {
			email: String!
	    password: String!
		}`,
  },
  type: `type LoginWithEmailPayload {
    token: String!
    name: String!
    userType: String!
  }`,
  resolve: async ({ args }) => {
    const { input: { email, password } } = args;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return new Promise((resolve, reject) => {
          // validate password
          user._.password.compare(password, (err, isMatch) => {
            if (err) {
              reject(err);
            }
            if (isMatch) {
              resolve({
                name: user.name,
                userType: user.__t || 'user',
                token: user.signToken(),
              });
            }
            reject(Error('password incorrect'));
          });
        });
      }
      return Promise.reject(Error('email/user not found'));
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
