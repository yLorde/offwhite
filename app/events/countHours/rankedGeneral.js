const { prefix, channelStaffCommands } = require('../../config.json')
const { Client, Message, MessageEmbed } = require("discord.js");
const { callProcedure, callProcedureId,  rankedPointById, countMov }  = require('../../database/handlerDB')

module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        try{

            if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;

            if(message.content.startsWith(`${prefix}rankedtimelastweek`)) {
                const ranking = await callProcedure('getRankedTimeLastWeek')
                await message.channel.send({embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setTitle('Ranking Geral de Horas da semana Passada')
                .addFields(
                    ranking.map((rank,id)=>{
                        const user  =  message.guild.members.cache.get(rank.discord_id)
                        
                        return {
                            name: `\u200B`,
                            value:`${id+1} - ${user===undefined ?
                                `Usuário(a) saiu do servidor.`
                                : user.nickname===null ? user.user.username : user.nickname } - ${rank.time}`
                        }})
                    )
                ]});

                message.react('✅');
        }
            else if(message.content.startsWith(`${prefix}rankcall`)) {
                

                const ranking = await callProcedure('getRankedTimeThisWeek')
    
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle('Ranking de Horas Semanal')
                        .addFields( 
                            ranking.map((rank,id)=>{
                                const user  =  message.guild.members.cache.get(rank.discord_id)
                                
                                return {
                                    name: `\u200B`,
                                    value:`${id+1} - ${user===undefined ?
                                        `Usuário(a) saiu do servidor.`
                                        : user.nickname===null ? user.user.username : user.nickname } - ${rank.time}`
                                }})
                )
            ]});
            
            message.react('✅');

        }
        else if(message.content.startsWith(`${prefix}usercall`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const ranking = await callProcedureId('getTimeByDiscordId', args[1].replace("<","").replace("@","").replace(">",""))
            const points = await rankedPointById(args[1].replace("<","").replace("@","").replace(">",""))
            const tPoints = points[0][0].total
            const movs = await countMov(args[1].replace("<","").replace("@","").replace(">",""))
            const msgs = await callProcedureId("getRankedMsgById", args[1].replace("<","").replace("@","").replace(">",""))
            const divs = await callProcedureId("getRankedDivById", args[1].replace("<","").replace("@","").replace(">",""))
            client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user)=>{
                 message.channel.send({embeds: [new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`Estatísticas do ${user.username}#${user.discriminator}`)
                    .addFields(
                        {name:"Semanal", value: `${ranking.week}`, inline:true},
                        {name:"Semana Passada", value: `${ranking.last_week}`, inline:true},
                        {name:"Mensal", value: `${ranking.month}`, inline:true},)
                    .setDescription("Horas")
                    
                ,
                new MessageEmbed()
                .setColor("BLUE")
                .addFields(
                    {name:"Semanal", value: `${msgs.week}`, inline:true},
                    {name:"Semana Passada", value: `${msgs.last_week}`, inline:true},
                    {name:"Mensal", value: `${msgs.month}`, inline:true},)
                .setDescription("Mensagens")
                ,
                new MessageEmbed()
                .setColor("BLUE")
                .addFields(
                    {name:"Semanal", value: `${divs.week}`, inline:true},
                    {name:"Semana Passada", value: `${divs.last_week}`, inline:true},
                    {name:"Mensal", value: `${divs.month}`, inline:true})
                    .setDescription("Divs")
                ,
                    new MessageEmbed()
                    .setColor("BLUE")
                    .addFields(
                    {name:"MOVs", value:`${movs[0].length}`,inline:true},
                    {name:"Pontos", value:`${tPoints}`,inline:true},
                )

            
            ]})
            })
                .catch(err=>{
                    console.log(err)
                    message.react('❌');
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`O id informado é inválido.`)
                    ]});
                })
                message.react('✅')
            }
            else if(message.content.startsWith(`${prefix}rankedtimemonth`)) { 
            const ranking = await callProcedure('getRankedTimeMonth')
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setTitle('Ranking de Horas Mensal')
                .addFields( 
                    ranking.map((rank,id)=>{
                        const user  =  message.guild.members.cache.get(rank.discord_id)
                        
                        return {
                            name: `\u200B`,
                            value:`${id+1} - ${user===undefined ?
                                `Usuário(a) saiu do servidor.`
                                : user.nickname===null ? user.user.username : user.nickname } - ${rank.time}`
                        }})
                            )
            ]});
            
            message.react('✅');
        }else if (message.content.startsWith(`${prefix}rankedtime`)) {
            const ranking = await callProcedure('getRankedTime')
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setTitle('Ranking Geral de Horas')
                .addFields( 
                    ranking.map((rank,id)=>{
                        const user  =  message.guild.members.cache.get(rank.discord_id)
                        
                        return {
                            name: `\u200B`,
                            value:`${id+1} - ${user===undefined ?
                                `Usuário(a) saiu do servidor.`
                                : user.nickname===null ? user.user.username : user.nickname } - ${rank.time}`
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