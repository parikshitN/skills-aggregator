const {makeExecutableSchema} = require("graphql-tools");
const {importSchema} = require("graphql-import");
const {skillResolver} = require("./src/graphql/skills");
const {ApolloServer} = require("apollo-server-express");
const SkillsApi = require("./src/datasources/SkillsAPI");

const schema = makeExecutableSchema({typeDefs: importSchema('src/graphql/schema.graphql'), resolvers: [skillResolver]});

const apolloServerConfig = {schema};

const context = ({req}) => ({})

const server = new ApolloServer({...apolloServerConfig, context, dataSources: () => ({skillsAPI: new SkillsApi()}),});

module.exports = server
