process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

const keystone = require('keystone');
// const chai = require('chai');
const Cryptr = require('cryptr');

keystone.init({
  name: 'yez-ng-backend',
  's3 config': {},
  headless: true,
  // 'module root': 'C:\\Users\\DAVID\\Documents\\GitHub\\YEZ-NG-Backend',
  'view engine': 'pug',
  emails: 'templates/emails',
});


keystone.import('../models');
keystone.import('../subModels');

keystone.set('brandDetails', {
  brand: keystone.get('brand') || 'Youth Empowerment Zone',
  mailAddress: '22 Kumasi Cresent, Wuse 2, Abuja',
  homepageUrl: process.env.FRONT_END_URL,
  phone: '+234.818.855.5611',
  emailLogoUrl: 'https://yez-ng-backend.herokuapp.com/images/yez-logo.svg',
  // emailLogoUrl: 'http://www.yeznigeria.org/static/images/yez-logo.svg',
});

keystone.pvCryptr = new Cryptr(process.env.PASSWORD_VERSION_SECRET);

// chai.should();

const MongodbMemoryServer = require('mongodb-memory-server');

let mongod;
before(async () => {
  mongod = new MongodbMemoryServer.default({
    binary: {
      version: 'latest',
    },
  });
  global.__MONGO_URI__ = await mongod.getConnectionString();
  global.__MONGO_DB_NAME__ = await mongod.getDbName();
  global.__COUNTERS__ = {
    user: 0,
    jobExperience: 0,
    education: 0,
    certificate: 0,
    referee: 0,
    candidateDocument: 0,
    caseFile: 0,
    posts: 0,
    postCategories: 0,
    events: 0,
  };
});

after(async () => {
  // console.log('stop mongod');
  await mongod.stop();
});
