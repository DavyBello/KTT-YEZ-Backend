const keystone = require('keystone');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = keystone.list('User').model;

// activateAccount resolver for user
module.exports = {
  kind: 'mutation',
  name: 'activateAccount',
  description: 'Activate a User account',
  args: { code: 'String!' },
  type: `type ActivateUserAccountPayload {
    token: String!
    userType: String!
    name: String!
  }`,
  resolve: async ({ args }) => {
    // console.log('user activate');
    const { code } = args;
    try {
      const data = jwt.verify(code, process.env.ACTIVATION_JWT_SECRET);
      const { id, createdAt } = data;
      if (id) {
        if (createdAt && moment(createdAt).isAfter(moment().subtract(24, 'hours'))) {
          const user = await User.findOne({ _id: id });
          // console.log(user);
          if (user.isActivated) {
            return Promise.reject(new Error('activated account'));
          }
          user.isActivated = true;
          await user.save();
          const token = user.signToken();
          return {
            name: user.name,
            userType: user.__t || 'user',
            token,
          };
        }
        return Promise.reject(new Error('expired token'));
      }
      return Promise.reject(new Error('invalid token'));
    } catch (e) {
      throw e;
    }
  },
};
