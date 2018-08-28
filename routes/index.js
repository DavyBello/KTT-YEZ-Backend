const cors = require('cors');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { ApolloServer } = require('apollo-server-express');

// const schema = require('../graphql/schema-compose');
const schema = require('../graphql/schema');
const getContext = require('../graphql/lib/getContext');
// const corsOptions = require('../config/corsOptions');

// Setup Route Bindings
module.exports = (app) => {
  // Register API middleware
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    jwt({
      secret: process.env.JWT_SECRET,
      credentialsRequired: false,
    }),
    graphqlExpress(req => ({ schema, context: getContext({ jwtPayload: req.user }) })),
  );

  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // const server = new ApolloServer({ schema });
  // server.applyMiddleware({ app });
  // console.log(server);


  // Views
  app.get('/admin', (req, res) => { res.redirect('/keystone'); });
  app.get('/', (req, res) => { res.redirect('/keystone'); });

  // routes for testing in development
  // if (process.env.NODE_ENV === 'development') {
  //   app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  // }
};
