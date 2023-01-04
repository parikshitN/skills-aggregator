const nock = require("nock");
const {userServiceBaseUrl, updateExpertise, getUser} = require("../../../endpoints/UsersEndpoints");
const gql = require("graphql-tag");
const {makeExecutableSchema} = require("graphql-tools");
const {importSchema} = require("graphql-import");
const {ApolloClient} = require("apollo-client");
const {InMemoryCache} = require("apollo-cache-inmemory");
const {SchemaLink} = require("apollo-link-schema");
const {usersResolver} = require("../index");
const UsersAPI = require("../../../datasources/UsersAPI");

describe('User expertise resolver test', () => {
    it('should be able to add expertise in skill for a user', async () => {
        const expertise =  [{skillId: '44b04e6d-8709-4f8d-b258-2f0e89696eb6', level: "Basic", experience: 4}];
        nock(userServiceBaseUrl).patch(updateExpertise('9a9161d3-7b25-4e13-a712-30d3a40e2bb0'), JSON.stringify(expertise))
            .reply(200, {userId: '9a9161d3-7b25-4e13-a712-30d3a40e2bb0', expertise});

        const client = apolloClient();

        const result = (await client.mutate({mutation: gql`
                mutation {
                    updateExpertise(input: {
                        userId: "9a9161d3-7b25-4e13-a712-30d3a40e2bb0",
                        expertise: [{skillId: "44b04e6d-8709-4f8d-b258-2f0e89696eb6", level: "Basic", experience: 4}]
                    }) {
                        userId
                        expertise {
                            experience
                            level
                            skillId
                        }
                    }
                }`})).data.updateExpertise;
        expect(result).toEqual({userId: '9a9161d3-7b25-4e13-a712-30d3a40e2bb0', expertise})
    });

    it('should get the user for a given uuid', async () => {
        const expertise =  [{skillId: '44b04e6d-8709-4f8d-b258-2f0e89696eb6', level: "Basic", experience: 4}];
        const response = {userId: '9a9161d3-7b25-4e13-a712-30d3a40e2bb0', firstName: 'Walter'
            , lastName: 'White', email: 'walter@test.com', expertise};
        const client = apolloClient();
        nock(userServiceBaseUrl).get(getUser('9a9161d3-7b25-4e13-a712-30d3a40e2bb0'))
            .reply(200,  response);

        const result = (await client.query({query: gql`
                query {
                    getUser(input: "9a9161d3-7b25-4e13-a712-30d3a40e2bb0") {
                        userId
                        firstName
                        lastName
                        email
                        expertise {
                            experience
                            level
                            skillId
                        }
                    }
                }`})).data.getUser;
        expect(result).toEqual(response)
    });

});
function apolloClient() {
    const schema = makeExecutableSchema({
        typeDefs: importSchema('src/graphql/schema.graphql'),
        resolvers: [usersResolver]
    });
    const usersAPI = new UsersAPI();
    usersAPI.initialize({});
    return new ApolloClient({
        cache: new InMemoryCache({
            addTypename: false,
        }),
        link: new SchemaLink({schema, context: {dataSources: {usersAPI}}})
    });
}
