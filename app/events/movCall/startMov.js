
const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix, guildId, maxMovDay} = require('../../config.json')
const {startMov, endMov, cancelMov} = require('../../database/handlerDB');

const sendMessage = require('../../rawCommands/sendMessage')
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        
        if (message.content.startsWith(`${prefix}start`)) {
        startMov(message.author.id).then(res=>{
            
            const guild = client.guilds.cache.get(guildId);
            const user = client.guilds.cache.find((guild) => guild.id === guildId).members.cache.find((member) => member.user.id === message.author.id);

            
            if(user.voice.channelId==null || user.voice.selfMute){
                message.channel.send({embeds: [new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`<@${message.author.id}> Para você iniciar sua MOV, você deve estar em algum canal de voz aqui do Servidor e não pode estar mutado.`)
                ]});
                message.react('⚠');
                cancelMov(message.author.id)
                return
            }

            if(res[0][0].cMov>0){
                console.log(res)
                message.channel.send({embeds: [new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(`<@${message.author.id}> Você já iniciou sua MOV.`)
                ]});
                message.react('⚠');
                cancelMov(message.author.id)

                return
            }
            if(res[0][0].totalMovDay>=maxMovDay){
                //console.log(res)
                message.channel.send({embeds: [new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(`<@${message.author.id}> Você já realizou a quantidade de MOV máximas permitidas por dia.`)
                ]});
                message.react('⚠');
                cancelMov(message.author.id)

                return
            }
                setTimeout(()=> {
                    endMov(message.author.id).then((res)=>{
                        if(res.affectedRows>=1){
                            user.send({embeds: [new MessageEmbed()
                                .setColor("GREEN")
                                .setDescription(`Sua mov foi finalizada. Obrigado por nos ajudar <3`)
                            ]});
                        }
                    })
                },1000*3600)
                message.channel.send({embeds: [new MessageEmbed()
                   .setColor("PURPLE")
                   .setDescription(`<@${message.author.id}> sua Mov acabou de iniciar.`)
               ]});
               message.react('✅');
            
            })
        } 
    },
};