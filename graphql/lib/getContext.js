const keystone = require('keystone');

// const User = keystone.list('User').model;
const Candidate = keystone.list('Candidate').model;
// const Company = keystone.list('Company').model;
// const CenterManager = keystone.list('CenterManager').model;


module.exports = ({ jwtPayload = {} } = {}) => {
  let context = {};
  if (jwtPayload) {
    const queryParams = {
      _id: jwtPayload.id,
      passwordVersion: jwtPayload.pv ? keystone.pvCryptr.decrypt(jwtPayload.pv) : -1,
    };

    context = {
      // user: jwtPayload ? User.findOne(queryParams) : Promise.resolve(null),
      User: jwtPayload.type ? Promise.resolve(jwtPayload) : Promise.resolve(null),
      Candidate:
        jwtPayload.type === 'Candidate' ? Candidate.findOne(queryParams) : Promise.resolve(null),
    };
  }

  return context;
};
