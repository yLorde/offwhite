const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,roleMute, channelGeneralLog } = require('../../config.json')
const { rankedMov, rankedPoint, rankedPointById} = require('../../database/handlerDB');



module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}movs`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = await message.author.id
            console.log(args[1].replace("<","").replace("@","").replace(">",""))
            rankedMov().then(res=>{
                //console.log(res[0])
                const user  =  message.guild.members.cache.get(staffId)
                 message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle(`Ranking de Mov do Servidor`)
                    .addFields( 
                        res[0].map((rank,id)=>{
                            const user  =  message.guild.members.cache.get(rank.discord_id)
                            return {
                                name: `\u200B`,
                                value:`${id+1} - ${user===undefined ?
                                    `Usuário(a) saiu do servidor.`
                                    : user.nickname===null ? user.user.username : user.nickname }- ${rank.totalMov} movs`
                            }})

                        )
                ]})
                message.react('✅');
            })
           
        }
        if (message.content.startsWith(`${prefix}points`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = await message.author.id
            
            rankedPoint().then(res=>{
                //console.log(res[0])
                const user  =  message.guild.members.cache.get(staffId)
                 message.channel.send({embeds: [new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`Ranking de Pontos do Servidor`)
                    .addFields( 
                        res[0].map((rank,id)=>{
                            const user  =  message.guild.members.cache.get(rank.discord_id)
                            
                            return {
                               
                                name:`${id+1} - ${user===undefined ?
                                    `Usuário(a) saiu do servidor.`
                                    : user.nickname===null ? user.user.username : user.nickname }`,
                                    value:`DIVs ${rank.divs} - MSGs ${rank.msg} - MOVs ${rank.mov} - ${rank.time} - ${rank.total} pontos`
                            }})

                        )
                ]})
                message.react('✅');
            })
           
        }
        if (message.content.startsWith(`${prefix}mypoints`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = await message.author.id
            
            rankedPointById(staffId).then(res=>{
                //console.log(res[0])
                const user  =  message.guild.members.cache.get(staffId)
                 message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle(`${user.nickname===null ? user.user.username : user.nickname }`)
                    .addFields( 
                        res[0].map((rank,id)=>{
                            const user  =  message.guild.members.cache.get(rank.discord_id)
                            
                            return {
                                name: `Pontuação:`,
                                value:`${rank.total}`
                            }})

                        )
                ]})
                message.react('✅');
            })
           
        }
    },
};