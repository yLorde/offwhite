const {execute} = require('../connection')
const sendMessage = require('../../rawCommands/sendMessage')
const { channelGeneralLog, channelWhitelist, tableWL} = require('../../config.json')

const table = "whitelist"

const forgive = (discord_id)=>{
    execute(
        `SELECT * FROM ${tableWL}  WHERE (discord_id= ?)`, [discord_id],(err, res)=>{
            if(res.length>0){
                
                if(res[0].whitelisted=="1"){
                    sendMessage(`O id ${discord_id} já foi adicionado antes da Whitelist`, channelWhitelist)
                }else if(res[0].whitelisted=="0"){
                    execute(`UPDATE ${tableWL} SET whitelisted = ? WHERE discord_id = ?`, 
                    [ 1, discord_id],(err,res)=>{
                        
                            if(res){
                                sendMessage(`O id ${discord_id} foi perdoado na Whitelist`, channelWhitelist)
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
module.exports = forgive