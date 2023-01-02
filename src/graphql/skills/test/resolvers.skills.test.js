const {ApolloClient} = require('apollo-client');
const gql = require('graphql-tag');
const { SchemaLink } = require('apollo-link-schema');
const { InMemoryCache } = require('apollo-cache-inmemory');
const {importSchema} = require("graphql-import");
const {skillResolver} = require("../index");
const SkillsAPI = require("../../../datasources/SkillsAPI");
const {makeExecutableSchema} = require("graphql-tools");
const {createSkill, skillServiceBaseUrl} = require("../../../endpoints/SkillsEndpoints");
const nock = require('nock');
const server = require("../../../../server");


describe('Skills resolver test', () => {
    it('should create skill', async () => {
        const response = {
            name: 'Kotlin',
            domain: 'Tech'
        }
        nock(skillServiceBaseUrl).post(createSkill(), { name: 'Kotlin',
            domain: 'Tech'}).reply(200, response)

        const client = apolloClient();

        const result = (await client.mutate({mutation: gql`
            mutation {
                createSkill(input: {
                    name: "Kotlin",
                    domain: "Tech"
                }) {
                    name
                    domain
                }
            }`})).data.createSkill;
        expect(result).toEqual({name: 'Kotlin', domain: 'Tech'})
    });
});

function apolloClient() {
    const schema = makeExecutableSchema({
        typeDefs: importSchema('src/graphql/schema.graphql'),
        resolvers: [skillResolver]
    });
    const skillsAPI = new SkillsAPI();
    skillsAPI.initialize({});
    const client = new ApolloClient({
        cache: new InMemoryCache({
            addTypename: false,
        }),
        link: new SchemaLink({schema, context: {dataSources: {skillsAPI}}})
    });
    return client;
}
