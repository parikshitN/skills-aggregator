exports.skillResolver = {
    Query : {
        async getAllSkills(_, args, {dataSources}) {
            return dataSources.skillsAPI.getAllSkills();
        },

        async getSkill(_, args, {dataSources}) {
            return dataSources.skillsAPI.getSkill(args.input);
        }
    },

    Mutation : {
        async createSkill(_, args, {dataSources}) {
            return await dataSources.skillsAPI.createSkill(args.input);
        },

        async updateSkill(_, args, {dataSources}) {
            return await dataSources.skillsAPI.updateSkill(args.input);
        }
    }

}
