const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const {skillResolver} = require("./src/graphql/skills/index.js");
const SkillsApi = require("./src/datasources/SkillsAPI.js");
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const app = express();


const schema = makeExecutableSchema({typeDefs: importSchema('src/graphql/schema.graphql'), resolvers: [skillResolver]});
const apolloServerConfig = {schema};
const context = ({req}) => ({})
const server = new ApolloServer({...apolloServerConfig, context, dataSources: () => ({skillsAPI: new SkillsApi()}),});
server.start().then(() => {
    server.applyMiddleware({app});

    app.listen(4000, () => {
        console.log(`Skills Aggregator is running on port 4000`);
    });
});

process.on('unhandledRejection', reason => {
    throw reason;
});

process.on('uncaughtException', function(err) {
    console.log('Error: ' + err);
});



