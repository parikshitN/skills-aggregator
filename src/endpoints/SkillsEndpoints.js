const skillServiceBaseUrl = process.env.SKILLS_SERVICE_URL || 'http://locahost:8080'

const createSkill = () => "/api/skills"
const getAllSkills = () => "/api/skills"
const getSkill = (uuid) => `/api/skills/${uuid}`
const updateSkill = () => "/api/skills"
module.exports = {
    skillServiceBaseUrl,
    createSkill,
    getAllSkills,
    getSkill,
    updateSkill
}
