const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelCommands, roleFounder, categoryVip, roleVipPlus } = require('../../config.json')
const { callProcedureId, checkVIP, getVIP,  } = require('../../database/handlerDB');
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        
      

        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelCommands) return;
        if (message.content.startsWith(`${prefix}mudarcall`) ) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            
            if( !message.member.roles.cache.has(roleVipPlus)){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("YELLOW")
                    .setTitle('VIP')
                    .setDescription(`Seu plano VIP não permite que você mude o nome da call.`)
                ]})
                return;
            }
            if( args.length<=1){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o novo nome da sua tag.
                    Exemplo: ${prefix}mudarcall nome da call aqui`)
                ]})
                return;
            }

            const newChannelName = args.slice(1).join(' ')
            getVIP(message.author.id).then(res=>{
                if(res[0][0]===undefined){
                     message.channel.send({embeds: [new MessageEmbed()
                        .setColor("YELLOW")
                        .setTitle('VIP não encontrado')
                        .setDescription(`Você não possui VIP ativo em sua conta.`)
                    ]})  
                    return;
                }

                const channel = message.guild.channels.cache.find(channel => channel.id ==res[0][0].channel_id)
                channel.edit({
                    name: newChannelName
                }).then(
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('Nome da Call alterada')
                        .setDescription(`<@${message.author.id}> tag foi alterada com sucesso`)
                    ]})  
                )
               
                
            }).catch(err=>console.log(err))
        }
      
    
    
    
    
    
    },
};
