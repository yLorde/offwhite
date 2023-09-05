const {execute} = require('../connection')
const sendMessage = require('../../rawCommands/sendMessage')
const { channelGeneralLog, channelWhitelist, tableWL} = require('../../config.json')

const table = tableWL
const insert = (discord_id,)=>{
const payload = {
    discord_id: discord_id,
}


 execute(
    `SELECT * FROM ${tableWL}  WHERE (id= ?)`, [discord_id],(err, res)=>{
        if (err) console.log(err)
        if(res.length>0){
            const status = res[0].whitelisted == '1' ? "Ativo" : "Suspenso"
            sendMessage(`O id ${discord_id} está ${status} na Whitelist`, channelWhitelist)
        }else{
            sendMessage(`O id ${discord_id} não foi encontrado na Whitelist`, channelWhitelist)
        }
        return res
        }
    )

}

module.exports = insert