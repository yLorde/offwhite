const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,roleMute, channelGeneralLog } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, isPunish, checkBe, callProcedure, callProcedureId, countMov} = require('../../database/handlerDB');



module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}infomov`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = await message.author.id
            
            countMov(staffId).then(res=>{
                //console.log(res[0])
                const user  =  message.guild.members.cache.get(staffId)
                 message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle(`Informações de MOV do(a) ${user.nickname===null ? user.user.username : user.nickname }`)
                    .setDescription(`Total de MOV da Semana: ${res[0].length}`)
                    .addFields( 
                        res[0].map((mov,id)=>{
                            return {
                                name: `\u200B`,
                                value:`${id+1} - ${mov.start_time } `
                            }})

                        )
                ]})
            })
           
        }
    },
};