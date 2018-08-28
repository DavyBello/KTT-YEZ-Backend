const keystone = require('keystone');
const jwt = require('jsonwebtoken');

module.exports = function () {
	const user = this;
	return new Promise(((resolve, reject) => {
		console.log('sending user activation email');
		if (user.isActivated) {
			// console.log('Account is already activated');
			reject(new Error('Account is already activated'));
		} else {
			if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
				console.log('Unable to send email - no mailgun credentials provided');
				reject(new Error('could not find mailgun credentials'));
			}

			const brandDetails = keystone.get('brandDetails');

			const code = jwt.sign({
				id: user._id,
				createdAt: Date.now()
			}, process.env.ACTIVATION_JWT_SECRET);
			const activationLink = `${process.env.FRONT_END_URL}/activate?code=${code}`;

			new keystone.Email({
				templateName: 'activate-account',
				transport: 'mailgun'
			}).send({
				to: [user.email],
				from: {
					name: 'Career Intelligence [ MCC, PRET, JP ]',
					email: 'no-reply@careerintelligence.global'
				},
				subject: 'Career Intelligence Account Activation',
				user,
				brandDetails,
				activationLink
			}, (err) => {
				if (err) {
					console.log(err);
					reject(err);
				}
			});
			resolve();
		}
	}));
};
