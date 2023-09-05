const addRole = require("../../rawCommands/addRole");

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
	name: 'messageReactionAdd',
	async execute(reaction,user) {
		
		const { message } = reaction
		if(message.id ==msgIdAcesso && message.channelId== channelIdAcesso && reaction.emoji.name=="✈"){
			addRole(roleRP,user.id)
		} 
		if(message.id ==msgIdAcesso && message.channelId== channelIdAcesso && reaction.emoji.name=="⚡"){
			addRole(roleSocial,user.id)
		} 
		
		//Notification handling
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="🔔"){
			addRole(roleNotiGeral,user.id)
		}
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="📷"){
			addRole(roleNotiInst,user.id)
		}
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="💎"){
			addRole(roleNotVIP,user.id)
		}
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="📺"){
			addRole(roleNotStream,user.id)
		}
		if(message.id ==msgIdNoti && message.channelId== chanelIdNoti && reaction.emoji.name=="🚩"){
			addRole(roleNotSModServ,user.id)
		}

	},
};