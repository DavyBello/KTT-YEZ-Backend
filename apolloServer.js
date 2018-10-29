const keystone = require('keystone');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./graphql/schema');
const getContext = require('./graphql/lib/getContext');
// const corsOptions = require('../config/corsOptions');
const services = require('./lib/services');

const User = keystone.list('User').model;

// Setup Route Bindings
module.exports = new ApolloServer({
  cors,
  schema,
  context: ({ req, res, connection: { context = {} } = {} }) => {
    let appContext = {};

    if (req) appContext = getContext({ jwtPayload: req.user });
    else if (context) appContext = getContext({ jwtPayload: context.tokenPayload });
    else appContext = getContext();

    return ({
      ...appContext,
      services,
      req,
      res,
    });
  },
  subscriptions: {
    onConnect: ({ authToken = null }) => {
      if (authToken) {
        try {
          const tokenPayload = User.decodeToken(authToken);
          return { tokenPayload };
        } catch (error) {
          throw error;
        }
      }

      throw new Error('Missing auth token!');
    },
  },
  introspection: true,
  playground: true,
});
