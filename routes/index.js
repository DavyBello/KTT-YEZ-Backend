const cors = require('cors');
const eJwt = require('express-jwt');
const { ApolloServer } = require('apollo-server-express');

const schema = require('../graphql/schema');
const services = require('../lib/services');
const getContext = require('../graphql/lib/getContext');
// const corsOptions = require('../config/corsOptions');

const apiPath = '/graphql';
const eJwtOptions = {
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
};

// Setup Route Bindings
module.exports = (app) => {
  // Register API middleware
  app.use(apiPath, eJwt(eJwtOptions));

  const server = new ApolloServer({
    cors,
    schema,
    context: ({ req, res }) => ({
      ...getContext({ jwtPayload: req.user }),
      services,
      req,
      res,
    }),
    introspection: true,
    playground: true,
  });

  server.applyMiddleware({ app, path: apiPath });

  // Views
  app.get('/admin', (req, res) => { res.redirect('/keystone'); });
  app.get('/', (req, res) => { res.redirect('/keystone'); });

  if (process.env.NODE_ENV !== 'production') {
    app.use('/t', require('./emails'));
  }
};
