const keystone = require('keystone');
const { UserInputError } = require('apollo-server');

const User = keystone.list('User').model;

module.exports = {
  kind: 'mutation',
  name: 'loginWithEmail',
  description: 'login a user',
  args: {
    input: `input CandidateLoginWithEmailInput {
			email: String!
	    password: String!
		}`,
  },
  type: `type CandidateLoginWithEmailPayload {
    token: String!
    name: String!
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
                token: user.signToken(),
              });
            }
            // reject(Error('invalid password'));
            reject(new UserInputError('invalid password'));
          });
        });
      }
      // return Promise.reject(Error('email/user not found'));
      return Promise.reject(new UserInputError('email not found'));
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
