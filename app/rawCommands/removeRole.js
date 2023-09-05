const axios = require('axios').default;
const {token,guildId } = require('../config.json')

async function deleteRole(role, userId) {
    try {     
        const URL = `https://discord.com/api/v9/guilds/${guildId}/members/${userId.replace("<","").replace("@","").replace(">","")}/roles/${role}`
        await axios.delete(URL, { headers: 
            { 
            'authorization': `Bot ${token}`,
        }, })
    } catch (error) {
        console.log(error)
    }
}


module.exports = deleteRole