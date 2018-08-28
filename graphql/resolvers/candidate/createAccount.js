const keystone = require('keystone');
// const { UserInputError } = require('apollo-server');

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
      phone: String!
		}`,
  },
  type: `type CreateCandidateAccountPayload {
    token: String!
    name: String!
  }`,
  resolve: async ({ args }) => {
    const {
      input: {
        firstName, lastName, email, password, phone,
      },
    } = args;
    try {
      const existing = await User.findOne({ phone });
      if (!existing) {
        const newCandidate = new Candidate({
          phone,
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
      return Promise.reject(Error('phone already exists'));
      // throw new UserInputError('phone already exists');
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
