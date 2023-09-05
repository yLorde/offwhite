const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands, roleFounder, categoryVip, roleVip, roleVipPlus } = require('../../config.json');
const { insertVIP,getVIP } = require("../../database/handlerDB");

module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        
        
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
//        if( !mod.roles.member.roles.cache.some(role => role.id === roleFounder) ) return;
        
        
        
        if (message.content.startsWith(`${prefix}addvip`) ) {
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
            if( args.length<=2){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o usuário para que irá receber o VIP, tempo em dias e o tipo de vip se for vipplus).
                    Exemplo: ${prefix}addvip 2222 60 vipplus`)
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
            if(hasVip[0][0]!==undefined){

                    message.channel.send({embeds: [new MessageEmbed()
                    .setColor("YELLOW")
                    .setTitle('Usuário já possui VIP')
                    .setDescription(`O usuário já possui o VIP adicionado, nosso sistema permite apenas uma call vip por usuário.`)
                ]})  
                return
            }
                
    
            const role = await message.guild.roles.create({
                name:member.user.username,
                color: 2303786,
                mentionable: false,
                position:2,
                permissions: [
                    "VIEW_CHANNEL",
                    "READ_MESSAGE_HISTORY"
                ]
            })
            if(args[3]=="vipplus"){
                member.roles.add(roleVipPlus)
            }else{
                member.roles.add(roleVip)
            }
            member.roles.add(role.id)
            
            await message.guild.channels.create(member.user.username, {
                type: 2,
                parent: categoryVip, 
                permissionOverwrites: [
                    {id: message.guild.id, allow: ['VIEW_CHANNEL']},
                    {id: message.guild.id, deny: ['CONNECT']},
                    {id: role.id, allow: ['CONNECT','SPEAK']},
                    {id: member.id, allow: ['MANAGE_MESSAGES',"MOVE_MEMBERS","MANAGE_CHANNELS"]},
                ]
            }).then(res=>{
                insertVIP(args[1].replace("<","").replace("@","").replace(">",""),role.id,args[2],res.id).then(res=>{
                     message.channel.send({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`O VIP do <@${args[1].replace("<","").replace("@","").replace(">","")}> foi adicionado.`)
                        .setThumbnail(member.user.avatarURL({ dynamic: true }))
                    ]}).catch(err=>{
                        console.log(err)
                         message.channel.send({embeds: [new MessageEmbed()
                            .setColor("YELLOW")
                            .setTitle('ERRO')
                            .setDescription(`O usuário já possui VIP.`)
                        ]})
                        message.react('✅');
                    });
                })
            }).catch(err=>{
                console.log(err)
                message.react('❌')
            })

        }
    

    },
};
