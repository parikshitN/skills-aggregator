exports.skillResolver = {
    Query : {
        async getAllSkills(_, args, {dataSources}) {
            return dataSources.skillsAPI.getAllSkills();
        }
    },

    Mutation : {
        async createSkill(_, args, {dataSources}) {
            return await dataSources.skillsAPI.createSkill(args.input);
        }
    }

}
