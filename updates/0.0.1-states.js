/**
 * This script automatically creates the nigerian states and local governmennts
 * when an empty database is used for the first time. You can use this
 */
/* eslint-disable new-cap */
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
        const newLocalGovernment = new LocalGovernment.model({
          name: local.name,
          stateId: savedState.id,
        });
        newLocalGovernment.save((e, localGov) => {
          if (e) {
            console.error(`Error adding lG: ${localGov.name} to the database:`);
            console.error(e);
            done(e);
          }
        });
      });
      done();
    }
  });
};

module.exports = (done) => {
  async.forEach(states, createState, done);
};
