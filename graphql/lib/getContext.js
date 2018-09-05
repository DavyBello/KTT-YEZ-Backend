const keystone = require('keystone');

const User = keystone.list('User').model;
const Candidate = keystone.list('Candidate').model;
// const Company = keystone.list('Company').model;
// const CenterManager = keystone.list('CenterManager').model;

const getViewer = ({ id, pv, type }) => {
  const queryParams = {
    _id: id,
    passwordVersion: pv ? keystone.pvCryptr.decrypt(pv) : -1,
  };

  let viewer = Promise.resolve(null);

  if (type === 'User') viewer = User.findOne(queryParams);
  if (type === 'Candidate') viewer = Candidate.findOne(queryParams);
  // if (type  === 'Company') viewer = Company.findOne(queryParams);
  // if (type  === 'CenterManager') viewer = CenterManager.findOne(queryParams);

  return viewer;
};

module.exports = ({ jwtPayload = {} } = {}) => {
  let context = {
    models: {
      User,
      Candidate,
    },
  };
  if (jwtPayload) {
    const { id, pv, type } = jwtPayload;

    context = {
      ...context,
      jwtPayload,
      viewer: getViewer({ id, pv, type }),
      scope: type || 'User',
    };
  }

  return context;
};
