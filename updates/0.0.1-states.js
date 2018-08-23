/**
 * This script automatically creates the nigerian states and local governmennts
 * when an empty database is used for the first time. You can use this
 */

const keystone = require('keystone');
const async = require('async');

const State = keystone.list('State');
const LocalGovernment = keystone.list('LocalGovernment');

const states = require('./data/nigeria-states');

const createState = (state, done) => {
  const stateName = state.state.name;

  const newState = new State.model({ name: stateName });
  newState.save((err, savedState) => {
    if (err) {
      console.log(err);
      done(err);
    } else {
      state.state.locals.forEach((local) => {
        const newLocalGovernment = new LocalGovernment.model({ name: local.name, state: savedState.id });
        newLocalGovernment.save((err, localGov) => {
          if (err) {
            console.error(`Error adding lG: ${localGov.name} to the database:`);
            console.error(err);
            done(err);
          }
        });
      });
      done();
    }
  });
};

exports = module.exports = function (done) {
  async.forEach(states, createState, done);
};
