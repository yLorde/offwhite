const {execute} = require('../connection')
const sendMessage = require('../../rawCommands/sendMessage')
const { channelGeneralLog, channelWhitelist, tableWL} = require('../../config.json')
const findId = require('./findDiscorId')

const table = "whitelist"

const  insert = (discord_id, discord_mod_id, id)=>{

const register = {
    discord_id: discord_id, 
    discord_mod_id: discord_mod_id,
    whitelisted: 1
}


 execute(
    `UPDATE ${tableWL} SET ? WHERE id = ${id}`, register,(err,res)=>{
        console.log(err)
        
        //const table = err.sql!==null ? "" : err.sql.split(" ")[2]
    
        if(err){
            switch (err.errno) {
                case 1062:
                       sendMessage(`O usuário já foi adicionado a Whitelist antes`,'whitelist',channelWhitelist)
                        findId(discord_id)
                       return
                    default:
                        console.log(err)
                        break;
            }
        }   
            sendMessage("O ação não foi executada.",channelGeneralLog)
            if(res){
                sendMessage(`O usuário com o ID ${discord_id} foi adicionado a Whitelist`,channelWhitelist)
            }
    
    })

}

module.exports = insert