const {ApolloClient} = require('apollo-client');
const gql = require('graphql-tag');
const {SchemaLink} = require('apollo-link-schema');
const {InMemoryCache} = require('apollo-cache-inmemory');
const {importSchema} = require("graphql-import");
const {skillResolver} = require("../index");
const SkillsAPI = require("../../../datasources/SkillsAPI");
const {makeExecutableSchema} = require("graphql-tools");
const {
    createSkill,
    skillServiceBaseUrl,
    getAllSkills,
    getSkill,
    updateSkill, deleteSkill
} = require("../../../endpoints/SkillsEndpoints");
const nock = require('nock');
const server = require("../../../../server");


describe('Skills resolver test', () => {
    it('should create skill', async () => {
        const response = {
            name: 'Kotlin',
            domain: 'Tech'
        }
        nock(skillServiceBaseUrl).post(createSkill(), {
            name: 'Kotlin',
            domain: 'Tech'
        }).reply(200, response)

        const client = apolloClient();

        const result = (await client.mutate({
            mutation: gql`
                mutation {
                    createSkill(input: {
                        name: "Kotlin",
                        domain: "Tech"
                    }) {
                        name
                        domain
                    }
                }`
        })).data.createSkill;
        expect(result).toEqual({name: 'Kotlin', domain: 'Tech'})
    });

    it('should get all skills', async () => {
        const response = [{
            uuid: '6992cc48-2e72-4695-b38a-6440fbdbdc32',
            name: 'Kotlin',
            domain: 'Tech'
        }, {
            uuid: '4383d1eb-0022-44e6-814b-6769243b6628',
            name: 'Java',
            domain: 'Tech'
        }]
        nock(skillServiceBaseUrl).get(getAllSkills()).reply(200, response)

        const client = apolloClient();

        const result = (await client.query({
            query: gql`
                query {
                    getAllSkills {
                        uuid
                        name
                        domain
                    }
                }`
        })).data.getAllSkills;
        expect(result).toEqual(response)
    });

    it('should get the skill for a given uuid', async () => {
        const response = {
            uuid: '6992cc48-2e72-4695-b38a-6440fbdbdc32',
            name: 'Kotlin',
            domain: 'Tech'
        }
        nock(skillServiceBaseUrl).get(getSkill('6992cc48-2e72-4695-b38a-6440fbdbdc32')).reply(200, response)

        const client = apolloClient();

        const result = (await client.query({
            query: gql`
                query {
                    getSkill(input: "6992cc48-2e72-4695-b38a-6440fbdbdc32") {
                        uuid
                        name
                        domain
                    }
                }`
        })).data.getSkill;

        expect(result).toEqual(response)
    });

    it('should update the skill', async () => {
        const response = {
            uuid: '6992cc48-2e72-4695-b38a-6440fbdbdc32',
            name: 'Java 8',
            domain: 'Tech'
        }
        nock(skillServiceBaseUrl).put(updateSkill()).reply(200, response)
        const client = apolloClient();

        const result = (await client.mutate({
            mutation: gql`
                mutation {
                    updateSkill(input: {
                        uuid: "6992cc48-2e72-4695-b38a-6440fbdbdc32",
                        name: "Java 8",
                        domain: "Tech"
                    }) {
                        uuid
                        name
                        domain
                    }
                }`
        })).data.updateSkill;

        expect(result).toEqual(response)
    });

    it('should delete the skill', async () => {
        nock(skillServiceBaseUrl).delete(deleteSkill('6992cc48-2e72-4695-b38a-6440fbdbdc32')).reply(200, 'Skill deleted successfully')
        const client = apolloClient();

        const result = (await client.mutate({
            mutation: gql`
                mutation {
                    deleteSkill(input: "6992cc48-2e72-4695-b38a-6440fbdbdc32") {
                        message
                    }
                }`
        })).data.deleteSkill;

        expect(result.message).toEqual('Skill deleted successfully')
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
