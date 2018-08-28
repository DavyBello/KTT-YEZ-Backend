const keystone = require('keystone');
const jwt = require('jsonwebtoken');


module.exports = async (token) => {
  const Candidate = keystone.list('Candidate').model;

  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token.substring(4), process.env.JWT_SECRET);

    if (decodedToken) {
      const queryParams = {
        _id: decodedToken.id,
        passwordVersion: decodedToken.pv ? keystone.pvCryptr.decrypt(decodedToken.pv) : -1,
      };

      const context = {
        // user: decodedToken ? User.findOne(queryParams) : Promise.resolve(null),
        User: decodedToken.type ? Promise.resolve(decodedToken) : Promise.resolve(null),
        Candidate:
					decodedToken.type === 'Candidate' ? Candidate.findOne(queryParams) : Promise.resolve(null),
      };

      return context;
    }
    return null;
  } catch (err) {
    return { user: null };
  }
};
