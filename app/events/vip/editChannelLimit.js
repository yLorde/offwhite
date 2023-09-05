const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelCommands, roleFounder, categoryVip, roleVipPlus } = require('../../config.json')
const { callProcedureId, checkVIP, getVIP,  } = require('../../database/handlerDB');
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
       
       
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelCommands) return;
        if (message.content.startsWith(`${prefix}limitecall`) ) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            
            
            if( args.length<=1){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir a qtde de espaços que deseja ter em sua call.
                    Exemplo: ${prefix}limitecall 10`)
                ]})
                return;
            }
            console.log(Number(args[1]))
            if( !(Number(args[1])>=0 && Number(args[1])<=99)){
                message.channel.send({embeds: [new MessageEmbed()
                   .setColor("RED")
                   .setTitle('Qtde incorreta')
                   .setDescription(`Você precisar inserir um número entre 0 e 99.`)
               ]})  
               return;
           }

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
                //console.log(channel)
                
                channel.edit({
                   // name: channel.name,
                    //type: 2,
                    userLimit: args[1]
                }).then((ch)=>{
                  //  console.log(ch)
                    message.reply({embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('Qtde alterada com sucesso')
                        .setDescription(`A quatidade da tag foi alterada com sucesso`)
                    ]})  
                    }
                )
               
                
            }).catch(err=>console.log(err))
        }
      
    
    
    
    
    
    },
};
