const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelCommands, roleFounder, categoryVip } = require('../../config.json')
const { callProcedureId, checkVIP, getVIP,  } = require('../../database/handlerDB');
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        

        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelCommands) return;
        if (message.content.startsWith(`${prefix}mudartag`) ) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            
            if( args.length<=1){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o novo nome da sua tag.
                    Exemplo: ${prefix}mudartag sua tag aqui`)
                ]})
                return;
            }

            const newTagName = args.slice(1).join(' ').substring(0,50)
            getVIP(message.author.id).then(res=>{
                if(res[0][0]===undefined){
                     message.channel.send({embeds: [new MessageEmbed()
                        .setColor("YELLOW")
                        .setTitle('VIP não encontrado')
                        .setDescription(`Você não possui VIP ativo em sua conta.`)
                    ]})  
                    return;
                }

                const role = message.guild.roles.cache.find(role => role.id =res[0][0].role_id)
                role.edit({
                    name: newTagName
                }).then(
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('TAG alterada')
                        .setDescription(`<@${message.author.id}> tag foi alterada com sucesso`)
                    ]}).catch(err=>{
                        console.log(err)
                        message.react('⚠');
                    })  
                )
               
                
            }).catch(err=>{
                console.log(err)
                message.react('⚠');
            })
        }
      
    
    
    
    
    
    },
};