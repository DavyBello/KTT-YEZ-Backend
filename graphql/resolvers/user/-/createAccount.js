const keystone = require('keystone');
const jwt = require('jsonwebtoken');

const User = keystone.list('User').model;
const { UserTC } = require('../../composers');

// loginWithEmail resolver for user
module.exports = {
	kind: 'mutation',
	name: 'createAccount',
	description: 'create a user account',
	args: { email: 'String!', password: 'String!' },
	type: UserTC,
	resolve: async ({ args, context }) => {
		const { email, password } = args;
		try {
			const existing = await User.findOne({ email });
			if (!existing) {
				// hash password and create user
				const newUser = new User({
					email,
					password
				});
				return newUser.save().then((user) => {
					const token = user.signToken();
					return ({
						name: user.name,
						jwt: token
					});
				});
			}
			return Promise.reject('email already Exists');
		} catch (e) {
			return Promise.reject(e);
		}
	}
};
