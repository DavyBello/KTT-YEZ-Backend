const keystone = require('keystone');
// const { UserInputError } = require('apollo-server');

const Company = keystone.list('Company').model;
const User = keystone.list('User').model;

module.exports = {
  kind: 'mutation',
  name: 'createAccount',
  description: 'create a new company account',
  args: {
    input: `input CreateCompanyAccountInput {
      name: String!
      email: String!
      cacRegNo: String!
      password: String!
		}`,
  },
  type: `type CreateCompanyAccountPayload {
    token: String!
    name: String!
  }`,
  resolve: async ({ args }) => {
    const {
      input: {
        name,
        email,
        cacRegNo,
        password,
      },
    } = args;
    try {
      const existing = await User.findOne({ email });
      if (!existing) {
        const newCompany = new Company({
          name,
          cName: name,
          email,
          password,
          cacRegNo,
        });
        await newCompany.save();
        return {
          name: newCompany.name,
          token: newCompany.signToken(),
        };
      }
      return Promise.reject(Error('email already exists'));
      // throw new UserInputError('phone already exists');
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
