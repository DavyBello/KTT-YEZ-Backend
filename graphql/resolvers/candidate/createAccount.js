const keystone = require('keystone');
const { UserInputError } = require('apollo-server');

const Candidate = keystone.list('Candidate').model;
const User = keystone.list('User').model;

module.exports = {
  kind: 'mutation',
  name: 'createAccount',
  description: 'create a newCandidate account',
  args: {
    input: `input CreateCandidateAccountInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!
		}`,
  },
  type: `type CreateCandidateAccountPayload {
    token: String!
    name: String!
  }`,
  resolve: async ({ args }) => {
    const {
      input: {
        firstName, lastName, email, password,
      },
    } = args;
    try {
      const existing = await User.findOne({ email });
      if (!existing) {
        const newCandidate = new Candidate({
          email,
          password,
          firstName,
          lastName,
        });
        await newCandidate.save();
        return {
          name: newCandidate.name,
          token: newCandidate.signToken(),
        };
      }
      // return Promise.reject(Error('phone already exists'));
      return Promise.reject(new UserInputError('email already exists'));
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
