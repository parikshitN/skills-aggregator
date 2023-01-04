const {makeExecutableSchema} = require("graphql-tools");
const {importSchema} = require("graphql-import");
const {skillResolver} = require("./src/graphql/skills");
const {ApolloServer} = require("apollo-server-express");
const SkillsAPI = require("./src/datasources/SkillsAPI");
const UsersAPI = require("./src/datasources/UsersAPI");
const {usersResolver} = require("./src/graphql/users");

const schema = makeExecutableSchema({typeDefs: importSchema('src/graphql/schema.graphql'), resolvers: [skillResolver, usersResolver]});

const apolloServerConfig = {schema};

const context = ({req}) => ({})

const server = new ApolloServer({...apolloServerConfig, context, dataSources: () => ({skillsAPI: new SkillsAPI(), usersAPI: new UsersAPI()}),});

module.exports = server
