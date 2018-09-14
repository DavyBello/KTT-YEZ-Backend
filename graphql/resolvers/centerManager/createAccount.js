const keystone = require('keystone');
// const { UserInputError } = require('apollo-server');

const CenterManager = keystone.list('CenterManager').model;
const User = keystone.list('User').model;

module.exports = {
  kind: 'mutation',
  name: 'createAccount',
  description: 'create a newCenterManager account',
  args: {
    input: `input CreateCenterManagerAccountInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      phone: String!
		}`,
  },
  type: `type CreateCenterManagerAccountPayload {
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
        const newCenterManager = new CenterManager({
          phone,
          email,
          password,
          firstName,
          lastName,
        });
        await newCenterManager.save();
        return {
          name: newCenterManager.name,
          token: newCenterManager.signToken(),
        };
      }
      return Promise.reject(Error('phone already exists'));
      // throw new UserInputError('phone already exists');
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
