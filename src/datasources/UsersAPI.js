const {RESTDataSource} = require("apollo-datasource-rest");
const {userServiceBaseUrl, updateExpertise, getUser} = require("../endpoints/UsersEndpoints");

class UsersAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = userServiceBaseUrl
    }

    willSendRequest(request) {
        request.headers.set('Content-Type', 'application/json');
    }

    async updateExpertise(input) {
        return this.patch(updateExpertise(input.userId), JSON.stringify(input.expertise))
    }

    async getUser(userId) {
        return await this.get(getUser(userId))
    }
}

module.exports = UsersAPI;
