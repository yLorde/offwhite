const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelCommands, roleFounder, categoryVip } = require('../../config.json')
const { callProcedureId, checkVIP, getVIP,  } = require('../../database/handlerDB');
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
       

        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelCommands) return;
        if (message.content.startsWith(`${prefix}removetag`) ) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            
            if( args.length<=1){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o @nome ou id.
                    Exemplo: ${prefix}removetag 22222`)
                ]})
                return;
            }

            const newTagName = args.slice(1).join(' ')
            getVIP(message.author.id).then(res=>{
                if(res[0][0]===undefined){
                     message.channel.send({embeds: [new MessageEmbed()
                        .setColor("YELLOW")
                        .setTitle('VIP não encontrado')
                        .setDescription(`Você não possui VIP ativo em sua conta.`)
                    ]})  
                    return;
                }
                const member =  message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
                    console.log(member)
                if(member==undefined){
                        message.channel.send({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`Este usuário não está no servidor.`)
                    ]});
                    message.react('⚠');
                    return;
                }
                member.roles.remove(res[0][0].role_id).then(
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('TAG removida')
                        .setThumbnail(member.user.avatarURL({ dynamic: true }))
                        .setDescription(`A tag de <@${member.id}> foi removida.`)
                    ]})  
                    
                )
                message.react('✅');
               
                
            }).catch(err=>console.log(err))
        }
      
    
    
    
    
    
    },
};