process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

const keystone = require('keystone');
const chai = require('chai');
const Cryptr = require('cryptr');

keystone.init({
  name: 'yez-ng-backend',
  's3 config': {},
  headless: true,
  'module root': 'C:\\Users\\DAVID\\Documents\\GitHub\\YEZ-NG-Backend',
});


keystone.import('./models');
keystone.import('./subModels');

keystone.pvCryptr = new Cryptr(process.env.PASSWORD_VERSION_SECRET);

// console.log(keystone.lists);

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
    posts: 0,
    postCategories: 0,
  };
});

after(async () => {
  // console.log('stop mongod');
  await mongod.stop();
})
