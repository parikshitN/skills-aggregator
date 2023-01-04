const { RESTDataSource } = require('apollo-datasource-rest');
const {skillServiceBaseUrl, createSkill, getAllSkills, getSkill} = require("../endpoints/SkillsEndpoints");

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

}

module.exports = SkillsAPI;
