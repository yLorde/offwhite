const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,roleMuteTxt, channelGeneralLog } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, isPunish, checkBe, insertForgiven} = require('../../database/handlerDB');
const addRole = require('../../rawCommands/addRole')
const removeRole = require('../../rawCommands/removeRole')
const sendMessage = require('../../rawCommands/sendMessage')



module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}desmutarchat`)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = message.author.id
            if( args.length<=1){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o ID do usuário e o motivo.
                    Exemplo: ${prefix}desmutarchat 22222222 Perdoado`)
                ]})
                return;
            }
            checkPerm(staffId,"unmutetxt").then(res=>{
                 if(res){
                    isPunish(args[1].replace("<","").replace("@","").replace(">",""),'mutetxt').then(res=>{
                        if(!res){
                            message.react('❌');
                            message.channel.send({embeds: [new MessageEmbed()
                                .setColor("PURPLE")
                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> não possui punição de mute.`)
                            ]});
                        }else{
                            client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user) => {
                                const victim =  message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
                                
                                //insertPunish(staffId,'unmute',args.slice(2).join(' '),args[1].replace("<","").replace("@","").replace(">",""),0)
                                insertForgiven(args[1].replace("<","").replace("@","").replace(">",""),staffId,'mute',args.slice(2).join(' '))
                                removeRole(roleMuteTxt,args[1].replace("<","").replace("@","").replace(">",""))
                            sendMessage({embeds: [new MessageEmbed()
                                .setColor("YELLOW")
                                .setDescription(`<@${staffId}> desmutou o <@${args[1].replace("<","").replace("@","").replace(">","")}> pelo motivo ${args.slice(2).join(' ')}`)
                            ]},channelGeneralLog)
                            message.channel.send({embeds: [new MessageEmbed()
                                .setColor("PURPLE")
                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> foi desmutado com sucesso.`)
                        ]});
                            message.react('✅');
                            user.send({embeds: [new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`Você foi desmutado pelo seguinte motivo:${args.slice(2).join(' ')}`)
                            ]});
                        }).catch(err=>{
                            message.react('❌');
                            message.channel.send({embeds: [new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`O ID ${args[1].replace("<","").replace("@","").replace(">","")} está incorreto.`)
                            ]});
                        });
                    }
                })
                }else{
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`Você não possui permissão para executar este comando ou seu limite semanal acabou.`)
                    ]});

                }
            }
         )
           
        }
    },
};