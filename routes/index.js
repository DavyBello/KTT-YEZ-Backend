const eJwt = require('express-jwt');

const apolloServer = require('../apolloServer');

const apiPath = '/graphql';
const eJwtOptions = {
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
};

// Setup Route Bindings
module.exports = (app) => {
  // Register API middleware
  app.use(apiPath, eJwt(eJwtOptions));

  apolloServer.applyMiddleware({ app, path: apiPath });

  // Views
  app.get('/admin', (req, res) => { res.redirect('/keystone'); });
  app.get('/', (req, res) => { res.redirect('/keystone'); });

  if (process.env.NODE_ENV !== 'production') {
    app.use('/t', require('./emails'));
  }
};
