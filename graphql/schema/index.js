/*	generates a schema based on the database models for GraphQL using graphql-compose
	NOT YET COMPLETE
*/
const { schemaComposer } = require('graphql-compose');

const addRelationships = require('../relationships');
const addResolvers = require('../resolvers');
const addViewers = require('../viewers');


// Add relationships and resolvers to schema
addRelationships();
addResolvers();
addViewers();

const queries = require('./queries');
const mutations = require('./mutations');
// Add fields and resolvers to rootQuery
schemaComposer.Query.addFields(queries);

// Add fields and resolvers to rootMutation
schemaComposer.Mutation.addFields(mutations);

const schema = schemaComposer.buildSchema();
module.exports = schema;
