// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();
// require('dotenv').config();

const chai = require('chai');
const keystone = require('keystone');
const Cryptr = require('cryptr');

// Require keystone

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
  name: 'yez-ng-backend',
  's3 config': {},
  headless: true,
});

// keystone.set('mongoose', mongoose);

// const State = new keystone.List('State');
//
// State.add({
//   name: { type: String, required: true, index: true },
// });

// State.register();

// Load your project's Models
keystone.import('models');
keystone.import('subModels');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
// keystone.set('locals', {
//   _: require('lodash'),
//   env: keystone.get('env'),
//   utils: keystone.utils,
//   editable: keystone.content.editable,
// });

// Load your project's Routes
// keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
// keystone.set('nav', {
//   price: 'Price',
//   payments: ['Payment', 'TestCode'],
//   country: ['State', 'LocalGovernment'],
//   enquiries: 'GuestEnquiry',
//   users: ['Candidate', 'Admin'],
// });

// Configure cloudinary
// keystone.set('cloudinary config', process.env.CLOUDINARY_URL);

// keystone.set('brandDetails', {
//   brand: keystone.get('brand') || 'My Career Choice',
//   mailAddress: '22 Kumasi Cresent, Wuse 2, Abuja',
//   homepageUrl: 'https://careerintelligence.global',
//   phone: '+234.818.855.5611',
//   emailLogoUrl: 'https://res.cloudinary.com/hhg3osmd2/image/upload/v1533052639/career-intelligence.png',
//   emailSubLogoUrl: 'https://res.cloudinary.com/hhg3osmd2/image/upload/v1533052643/all-logos-1.png',
// });

// check for environment variables
function checkEnv(envVariable) {
  if (!process.env[envVariable]) {
    console.log(
      `----------------------------------------
				WARNING: MISSING ${envVariable} CREDENTIALS
				----------------------------------------`,
    );
  }
}

checkEnv('FRONT_END_URL');
checkEnv('JWT_SECRET');
checkEnv('ACTIVATION_JWT_SECRET');
checkEnv('PAYSTACK_SECRET_KEY');
checkEnv('PASSWORD_VERSION_SECRET');

keystone.pvCryptr = new Cryptr(process.env.PASSWORD_VERSION_SECRET);

// if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
//   console.log(
//     `----------------------------------------
// 			WARNING: MISSING MAILGUN CREDENTIALS
// 			----------------------------------------
// 			You have opted into email sending but have not provided
// 			mailgun credentials. Attempts to send will fail.
//
//       Create a mailgun account and add the credentials to the .env file to
// 			set up your mailgun integration`,
//   );
// }
