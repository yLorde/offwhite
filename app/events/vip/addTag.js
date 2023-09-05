const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelCommands, roleFounder, categoryVip } = require('../../config.json')
const { callProcedureId, checkVIP, getVIP,  } = require('../../database/handlerDB');
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        
        // if( !mod.roles.member.roles.cache.some(role => role.id === roleFounder) ) return;
        
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelCommands) return;
        if (message.content.startsWith(`${prefix}addtag`) ) {
            const mod =  await message.guild.members.cache.get(message.author.id)
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            
            if( args.length<=1){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o @nome ou id.
                    Exemplo: ${prefix}addtag 22222`)
                ]})
                return;
            }

            
            const member = await  message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
            getVIP(message.author.id).then(res=>{
                if(res[0][0]===undefined){
                     message.channel.send({embeds: [new MessageEmbed()
                        .setColor("YELLOW")
                        .setTitle('VIP não encontrado')
                        .setDescription(`Você não possui VIP ativo em sua conta.`)
                    ]})  
                    return;
                }
                    
                if(member==undefined){
                        message.channel.send({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`Este usuário não está no servidor.`)
                    ]});
                    message.react('⚠');
                    return;
                }
                member.roles.add(res[0][0].role_id).then(
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('TAG adicionada')
                        .setThumbnail(member.user.avatarURL({ dynamic: true }))
                        .setDescription(`<@${member.id}> recebeu sua tag.`)
                    ]})  
                    )
                    message.react('✅');
                
            }).catch(err=>console.log(err))
        }
      
    
    
    
    
    
    },
};