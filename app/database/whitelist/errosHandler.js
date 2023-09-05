const sendMessage = require('../../rawCommands/sendMessage')
const { channelGeneralLog, channelWhitelist} = require('../../config.json')

const sendMessageToTableChannel=(msg, table)=>{
    switch (table) {
        case 'whitelist':
            sendMessage(msg,channelWhitelist, true)
            break;
    
        default:
            sendMessage(msg,channelGeneralLog)
            break;
    }
}

module.exports =  (err,res)=>{
    //console.log(err)
    
    //const table = err.sql!==null ? "" : err.sql.split(" ")[2]

    if(err){
        switch (err.errno) {
            case 1062:
                   sendMessageToTableChannel(`O usuário já foi adicionado a Whitelist antes`,'whitelist')
                   return
                default:
                    //console.log(err)
                    break;
        }
    }   
        sendMessage("O ação não foi executada.",channelGeneralLog)
        //console.log(res)
        return res

}