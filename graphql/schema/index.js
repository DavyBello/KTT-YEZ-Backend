/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const { schemaComposer } = require('graphql-compose');
// const {
// 	GraphQLSchema,
// 	GraphQLNamedType,
// 	GraphQLDirective,
// 	SchemaDefinitionNode,
// } = require('graphql');

// Add relationships and resolvers to schema
require('../relationships');
require('../resolvers');
require('../viewers');

const queries = require('./queries');
const mutations = require('./mutations');
const subscriptions = require('./subscriptions');

// Add fields and resolvers to rootQuery
schemaComposer.Query.addFields(queries);

// Add fields and resolvers to rootMutation
schemaComposer.Mutation.addFields(mutations);

// Add fields and resolvers to rootSubscription
schemaComposer.Subscription.addFields(subscriptions);

const schema = schemaComposer.buildSchema();
module.exports = schema;
