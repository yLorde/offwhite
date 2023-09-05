const removeRole = require("../../rawCommands/removeRole");
const { 
	roleRP, roleSocial, msgIdAcesso,
	roleNotiGeral,
	roleNotiInst,
	roleNotVIP,
	roleNotStream,
	roleNotSModServ,
 } = require('../../config.json')
const msgIdWelcome = "1004367124803887194"
const channelIdAcesso = "1004362035015987290"

const msgIdNoti = "1004908215877767188"
const chanelIdNoti = "1004348010551070810"

module.exports = {
	name: 'messageReactionRemove',
	async execute(reaction,user) {
		const { message } = reaction
		//Acesso handling
		if(message.id ==msgIdAcesso && message.channelId== channelIdAcesso && reaction.emoji.name=="✈"){
			removeRole(roleRP,user.id)
		} 
		if(message.id ==msgIdAcesso && message.channelId== channelIdAcesso && reaction.emoji.name=="⚡"){
			removeRole(roleSocial,user.id)
		}

		//Notification handling
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="🔔"){
			removeRole(roleNotiGeral,user.id)
		}
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="📷"){
			removeRole(roleNotiInst,user.id)
		}
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="💎"){
			removeRole(roleNotVIP,user.id)
		}
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="📺"){
			removeRole(roleNotStream,user.id)
		}
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="🚩"){
			removeRole(roleNotSModServ,user.id)
		}
		
	},
};