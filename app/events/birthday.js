const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands, roleFounder, categoryBirthday, roleVip, roleVipPlus, guildId } = require('../config.json');
const { callProcedure } = require("../database/handlerDB");
const cron = require('node-cron');

module.exports = {
    name: 'ready',
	once: true,
	async execute(client) {
        cron.schedule('0 0 * * *',()=>{
            const guild = client.guilds.cache.get(guildId);
            callProcedure('getBirthdays').then(res=>{
                res.map(birth=>{
                    guild.channels.create(birth.name, {
                       type: 0,
                       parent: categoryBirthday, 
                       permissionOverwrites: [
                           {id: guild.id, allow: ['VIEW_CHANNEL','SEND_MESSAGES']},
       
                       ]
                   }).then(channel=>{
                    channel.send({embeds: [new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`🎈🎉✨Feliz aniversário ${birth.name}🎆🎊🎈`)
                        .setDescription(`A Iluminati te deseja um feliz aniversário e um ótimo dia!🎁`)
                    ]})
                   })
                })
            })
        }, {
            scheduled: true,
            timezone: "America/Sao_Paulo"
          })
        
    },
};
