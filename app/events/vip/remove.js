const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands, roleFounder, roleVip, roleVipPlus } = require('../../config.json');
const {  removeVIP, getVIP } = require("../../database/handlerDB");
const wait = require("timers/promises").setTimeout;
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        
        // if( !mod.roles.member.roles.cache.some(role => role.id === roleFounder) ) return;
        
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        
        
        
        if (message.content.startsWith(`${prefix}removevip`) ) {
            const mod =  await message.guild.members.cache.get(message.author.id)


            if( !mod.roles.member.roles.cache.some(role => role.id === roleFounder) ) {
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Sem permissão')
                    .setDescription(`Você não tem permissão para executar este comando.`)
                ]})
                return
            }
            
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            if( args.length<=1){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o @name ou id de quem irá remover o VIP.
                    Exemplo: ${prefix}removevip 2222`)
                ]})
                message.react('⚠');
                return;
            }
            const member = message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))

            if(member==undefined){
                    message.channel.send({embeds: [new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(`Este usuário não está no servidor.`)
                ]});
                message.react('⚠');
                return;
            }
            const hasVip = await getVIP(args[1].replace("<","").replace("@","").replace(">",""))
            if(hasVip[0][0]===undefined){

                    message.channel.send({embeds: [new MessageEmbed()
                    .setColor("YELLOW")
                    .setTitle('Usuário já possui VIP')
                    .setDescription(`O usuário não possui VIP para ser removido.`)
                ]})  
                message.react('⚠');
                return
            }
                getVIP(args[1].replace("<","").replace("@","").replace(">","")).then(res=>{
                    const role = message.guild.roles.cache.get(res[0][0].role_id)
                    role.delete()
                    wait(2000)
                    member.roles.remove(roleVipPlus)
                    wait(2000)
                    member.roles.remove(roleVip)
                    const fetchedChannel =message.guild.channels.cache.get(res[0][0].channel_id);
                    fetchedChannel.delete()
                  
                    removeVIP(res[0][0].discord_id)
                    message.react('✅');
                        message.channel.send({embeds: [new MessageEmbed()
                            .setColor("BLACK")
                            .setDescription(`O VIP do <@${args[1].replace("<","").replace("@","").replace(">","")}> foi removido.`)
                            .setThumbnail(member.user.avatarURL({ dynamic: true }))
                        ]});
                       
                    })
          

        }
    

    },
};