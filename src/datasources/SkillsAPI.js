const { RESTDataSource } = require('apollo-datasource-rest');
const {skillServiceBaseUrl, createSkill, getAllSkills, getSkill, updateSkill, deleteSkill} = require("../endpoints/SkillsEndpoints");

class SkillsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = skillServiceBaseUrl
    }

    willSendRequest(request) {
        request.headers.set('Content-Type', 'application/json');
    }

    async getAllSkills() {
        return await this.get(getAllSkills())
    }

    async createSkill(input) {
        console.log(JSON.stringify(input))
        return await this.post(createSkill(), JSON.stringify(input));
    }

    async getSkill(input) {
        return await this.get(getSkill(input))
    }

    async updateSkill(input) {
        return await this.put(updateSkill(), JSON.stringify(input))
    }

    async deleteSkill(input) {
        return await this.delete(deleteSkill(input))
    }
}

module.exports = SkillsAPI;
