exports.usersResolver = {

    Mutation : {
        async updateExpertise(_, args, {dataSources}) {
            return await dataSources.usersAPI.updateExpertise(args.input);
        }
    },

    Query : {
        async getUser(_, args, {dataSources}) {
            return await dataSources.usersAPI.getUser(args.input);
        }
    }
}
