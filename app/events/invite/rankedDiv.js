const { prefix, channelStaffCommands } = require('../../config.json')
const { Client, Message, MessageEmbed } = require("discord.js");
const { callProcedure, callProcedureId, }  = require('../../database/handlerDB')

module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        try{

            if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;

            if(message.content.startsWith(`${prefix}rankedivlastweek`)) {
                const ranking = await callProcedure('getRankedDivLastWeek')
                await message.channel.send({embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setTitle('Ranking Geral de Divulgação da semana Passada')
                .addFields( 
                    ranking.map((rank,id)=>{
                        const user  =  message.guild.members.cache.get(rank.discord_staff_id)
                        return {
                            name: `\u200B`,
                            value:`${id+1} - ${user===undefined ?
                                `Usuário(a) saiu do servidor.`
                                : user.nickname===null ? user.user.username : user.nickname }- ${rank.totalDiv}`
                        }})
                    )
                ]});

                message.react('✅');
        }
         
            else if(message.content.startsWith(`${prefix}rankeddivmonth`)) { 
            const ranking = await callProcedure('getRankedDivMonth')
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setTitle('Ranking de Divulgação Mensal')
                .addFields( 
                    ranking.map((rank,id)=>{
                        const user  =  message.guild.members.cache.get(rank.discord_staff_id)
                        
                        return {
                            name: `\u200B`,
                            value:`${id+1} - ${user===undefined ?
                                `Usuário(a) saiu do servidor.`
                                : user.nickname===null ? user.user.username : user.nickname }- ${rank.totalDiv}`
                        }})
                            )
            ]});
            message.react('✅');
        
        }          
        else if (message.content.startsWith(`${prefix}rankeddivgeral`)) {
            const ranking = await callProcedure('getRankedDiv')
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setTitle('Ranking Geral de Divulgação')
                .addFields( 
                    ranking.map((rank,id)=>{
                        const user  =  message.guild.members.cache.get(rank.discord_staff_id)
                        
                        return {
                            name: `\u200B`,
                            value:`${id+1} - ${user===undefined ?
                                `Usuário(a) saiu do servidor.`
                                : user.nickname===null ? user.user.username : user.nickname }- ${rank.totalDiv}`
                        }})
                            )
                        ]});
            message.react('✅');
            
        }
        
        else if(message.content.startsWith(`${prefix}rankdiv`)) {
                

            const ranking = await callProcedure('getRankedDivThisWeek')

            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setTitle('Ranking de Divulgação Semanal')
                    .addFields( 
                        ranking.map((rank,id)=>{
                            const user  =  message.guild.members.cache.get(rank.discord_staff_id)
                            
                            return {
                                name: `\u200B`,
                                value:`${id+1} - ${user===undefined ?
                                    `Usuário(a) saiu do servidor.`
                                    : user.nickname===null ? user.user.username : user.nickname }- ${rank.totalDiv}`
                            }})
            )
        ]});
        
        message.react('✅');

    }

    
    }catch(err){
        console.log(err)
        message.react('❌');
    }
    },
};