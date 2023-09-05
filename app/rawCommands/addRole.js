const axios = require('axios').default;
const superagent = require('superagent');
const {token,guildId } = require('../config.json')

async function addRole(role, userId) {
    const URL = `https://discord.com/api/v9/guilds/${guildId}/members/${userId.replace("<","").replace("@","").replace(">","")}/roles/${role}`
    try {
            superagent
                .put(URL)
                .set( {"Authorization": `Bot ${token}`})
                .end((err, res) => {
                    //console.log({err, res})
                // Calling the end function will send the request
                });

      } catch (err) {
        console.error(err);
      }
  
}



module.exports = addRole