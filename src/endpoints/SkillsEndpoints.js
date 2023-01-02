const skillServiceBaseUrl = process.env.SKILLS_SERVICE_URL || 'http://locahost:8080'

const createSkill = () => "/api/skills"

module.exports = {
    skillServiceBaseUrl,
    createSkill
}
