const axios = require('axios').default;
const {token } = require('../config.json')

async function Post(msg, channel, ephemeral=false) {
    try {     
        const URL = `https://discord.com/api/v9/channels/${channel}/messages`
        const payload = typeof msg==='object' ? msg : { content: msg }
         axios.post(URL, payload, { headers: { 'authorization': `Bot ${token}` }, }).catch(err=>{
            throw err;
         })
    } catch (error) {
        console.log(error)
    }
}


module.exports = Post