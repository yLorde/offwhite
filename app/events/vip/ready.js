const { Client, Message, MessageEmbed } = require("discord.js");
const { channelGeneralLog, guildId, roleVip, roleVipPlus} = require('../../config.json')
const { callProcedureId, checkVIP, removeVIP,  } = require('../../database/handlerDB');
const removeRole = require('../../rawCommands/removeRole')
const wait = require("timers/promises").setTimeout;
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		setInterval(() => {
			checkVIP().then(res=>{
					const guild = client.guilds.cache.get(guildId);
					res[0].map(res=>{
						const role = guild.roles.cache.get(res.role_id)
                    	role.delete()
						removeRole(roleVip,res.discord_id)
						 wait(3000)
						 removeRole(roleVipPlus,res.discord_id)
						 wait(3000)
						const fetchedChannel =guild.channels.cache.get(res.channel_id);
						fetchedChannel!== undefined ? fetchedChannel.delete() : null
						removeVIP(res.discord_id).catch(err=>console.log)
						guild.channels.cache.get(channelGeneralLog).send({embeds: [new MessageEmbed()
							.setColor("YELLOW")
							.setDescription(`O VIP do <@${res.discord_id}> expirou.`)
						]});	
					})
			})
		}, 5000);
	},
};