const keystone = require('keystone');
const jwt = require('jsonwebtoken');

const handleEmail = require('../../lib/handleEmail');

module.exports = async function (method) {
  const user = this;
  console.log('sending user activation email');
  if (user.isActivated) return (Error('Account is already activated'));

  const brandDetails = keystone.get('brandDetails');

  const code = jwt.sign({
    id: user._id,
    createdAt: Date.now(),
  }, process.env.ACTIVATION_JWT_SECRET);
  const activationLink = `${process.env.FRONT_END_URL}/activate?code=${code}`;

  return handleEmail({
    method,
    options: {
      templateName: 'activate-account',
      transport: 'mailgun',
    },
    locals: {
      to: [user.email],
      from: {
        name: 'Youth Empowerment Zone (YEZ)',
        email: 'no-reply@yeznigeria.org',
      },
      subject: 'Youth Empowerment Zone (YEZ) Account Activation',
      user,
      brandDetails,
      activationLink,
    },
  });
};
