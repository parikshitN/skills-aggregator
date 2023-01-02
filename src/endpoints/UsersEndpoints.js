userServiceBaseUrl = process.env.SKILLS_SERVICE_URL || 'http://locahost:8080'

const updateExpertise = userId => `/api/users/${userId}/expertise`

module.exports = {
    userServiceBaseUrl,
    updateExpertise
}