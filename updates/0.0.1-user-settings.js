const keystone = require('keystone');

const Candidate = keystone.list('Candidate').model;

module.exports = function (done) {
  Candidate.find().exec((err, users) => {
    if (err) done(err);
    users.forEach(u => u.createDefaultSettings());
    done();
  });
};
