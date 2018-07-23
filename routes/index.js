/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

 const keystone = require('keystone');
 const cors = require('cors');
 const jwt = require('express-jwt');
 const bodyParser = require('body-parser');
 const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
 const { ApolloServer } = require('apollo-server-express');

const schema = require('../graphql/schema-compose');

const User = keystone.list('User').model;
const Candidate = keystone.list('Candidate').model;
// const Company = keystone.list('Company').model;
// const CenterManager = keystone.list('CenterManager').model;
//const JWT_SECRET = require('../config').JWT_SECRET;


// Setup Route Bindings
exports = module.exports = function (app) {
	//Configure CORS -- Remove localhost in final version
	// let corsOptions = {}
  // if (process.env.NODE_ENV == 'production') {
  //   const whitelist = [process.env.FRONT_END_URL, 'http://localhost']
  //   corsOptions = {
  //     origin: function (origin, callback) {
  //       if (whitelist.indexOf(origin) !== -1) {
  //         callback(null, true)
  //       } else {
  //         callback(new Error('Not allowed by CORS'))
  //       }
  //     }
  //   }
  // }

	// Register API middleware
	// -------------------------------------------------------------------------
	// enable cors and jwt middleware on api route
	// app.use('/graphql', cors(corsOptions), bodyParser.json(), jwt({

  app.use('/graphql', cors(), bodyParser.json(), jwt({
	  secret: process.env.JWT_SECRET,
	  credentialsRequired: false,
	}), graphqlExpress(req => {
		//req.user is provided by jwt from the authorization header provided
		let context = {};
		if (req.user) {
			context = {
				//user: req.user ? User.findOne({ _id: req.user._id || req.user.id, version: req.user.version}) : Promise.resolve(null),
				User: req.user.type ? Promise.resolve(req.user) : Promise.resolve(null),
				Candidate: req.user.type==='Candidate' ?
					Candidate.findById(req.user.id) : Promise.resolve(null),
          // Company: req.user.type==='Company' ?
  				// 	Company.findById(req.user.id) : Promise.resolve(null),
  				// CenterManager: req.user.type==='CenterManager' ?
  				// 	CenterManager.findById(req.user.id) : Promise.resolve(null)
			}
		}
		return ({
		  schema: schema,
		  context: context
		})}
	));

	app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

  // const server = new ApolloServer({ schema });
  // server.applyMiddleware({ app });
  // console.log(server);


	// Views
	app.get('/admin', (req, res) => {res.redirect('/keystone')});
	app.get('/', (req, res) => {res.redirect('/keystone')});

	//routes for testing in development
	if (process.env.NODE_ENV == 'development') {
		/*app.all('/test', routes.views.tests.test);
		app.get('/blog/:category?', routes.views.blog);
		app.get('/blog/post/:post', routes.views.post);
		app.get('/gallery', routes.views.gallery);
		app.all('/contact', routes.views.contact);*/
	}
};
