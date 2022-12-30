const { RESTDataSource } = require('apollo-datasource-rest');
const {baseUrl, createSkill} = require("../endpoints/SkillsEndpoints");

class SkillsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = baseUrl
    }

    willSendRequest(request) {
        request.headers.set('Content-Type', 'application/json');
    }

    async getAllSkills() {
        return new Promise(resolve => {
            resolve([{uuid: '106ea4d5-8c2a-48d8-86dc-d4ddbd4656c4', name: "Java", domain: "Tech"}])
        })
    }

    async createSkill(input) {
        console.log(JSON.stringify(input))
        return await this.post(createSkill(), JSON.stringify(input));
    }

}

module.exports = SkillsAPI;
