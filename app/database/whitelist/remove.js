const {execute} = require('../connection')
const sendMessage = require('../../rawCommands/sendMessage')
const { channelGeneralLog, channelWhitelist, tableWL} = require('../../config.json')

const table = "whitelist"

const   remove = (discord_id)=>{
    execute(
        `SELECT * FROM ${tableWL}  WHERE (discord_id= ?)`, [discord_id],(err, res)=>{
            if(res.length>0){
                if(res[0].whitelisted=="0"){
                    sendMessage(`O id ${discord_id} já foi suspenso antes da Whitelist`, channelWhitelist)
                }else if(res[0].whitelisted=="1"){
                    execute(`UPDATE ${table} SET whitelisted = ? WHERE discord_id = ?`, 
                    [ 0, discord_id],(err,res)=>{
                            if(res){
                                sendMessage(`O id ${discord_id} foi suspenso da Whitelist`, channelWhitelist)
                            }
                    }
                )
                }  
            }else{
                    sendMessage(`O id ${discord_id} não foi encontrado na Whitelist`, channelWhitelist)
                }
            return res
            }
        )
   
    
}
module.exports = remove