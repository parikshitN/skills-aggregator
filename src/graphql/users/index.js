exports.usersResolver = {

    Mutation : {
        async updateExpertise(_, args, {dataSources}) {
            return await dataSources.usersAPI.updateExpertise(args.input);
        }
    }

}
