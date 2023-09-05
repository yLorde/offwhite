
const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,channelGeneralLog } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, isPunish, checkBe} = require('../../database/handlerDB');

const sendMessage = require('../../rawCommands/sendMessage')


module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}banir`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = await message.author.id
            if( args.length<=2){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o ID do usuário, Motivo e Tempo em minutos.
                    Exemplo: ${prefix}banir 22222222 Estourando Call `)
                ]})
                return;
            }
           
            const canBePunish = await checkBe(args[1].replace("<","").replace("@","").replace(">",""),"ban")
            //Check Perm DB
            const victim = message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
            if(victim==undefined){
                message.channel.send({embeds: [new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(`Este usuário não está no servidor.`)
                ]});
                message.react('⚠');
                return;
            }
            

            checkPerm(staffId).then(res=>{
                if(res && canBePunish){
                    client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user) => {
                        
                         countCommand(args[1].replace("<","").replace("@","").replace(">",""),'ban').then((res)=>{
                                const {total} = res;
                                function ban(){
                                    
                                    insertPunish(staffId,'mute',args.slice(2).join(' '),args[1].replace("<","").replace("@","").replace(">",""),999999999)
                                    sendMessage({embeds: [new MessageEmbed()
                                        .setColor("YELLOW")
                                        .setDescription(`<@${staffId}> baniu o <@${args[1].replace("<","").replace("@","").replace(">","")}> pelo motivo ${args.slice(2).join(' ')}`)
                                    ]},channelGeneralLog)
                                    
                                    user.send({embeds: [new MessageEmbed()
                                        .setColor("RED")
                                        .setDescription(`Você foi banido pelo seguinte motivo:${args.slice(2).join(' ')}`)
                                    ]});
                                    setTimeout(()=>{
                                        victim.ban().then(()=>{
                                            message.channel.send({embeds: [new MessageEmbed()
                                                .setColor("PURPLE")
                                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> foi banido com sucesso.`)
                                            ]});
                                            message.react('✅');
                                            
                                        }).catch((err)=>{
                                            message.channel.send({embeds: [new MessageEmbed()
                                                .setColor("PURPLE")
                                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> não pode ser executado.`)
                                            ]});
                                            message.react('✅');
                                        })
                                    },5000)
                                }
                                if(total==0){
                                    ban()
                                }else{
                                    isPunish(args[1].replace("<","").replace("@","").replace(">",""),'ban').then(res=>{
                                        if(res){
                                            message.channel.send({embeds: [new MessageEmbed()
                                                .setColor("RED")
                                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> já foi banido.`)
                                            ]});
                                            message.react('⚠');
                                        }else{
                                            ban()
                                        }
                                    })  
                                }
                            
                        })
                        }).catch(err=>{
                                message.react('❌');
                                message.channel.send({embeds: [new MessageEmbed()
                                    .setColor("RED")
                                    .setDescription(`O ID ${args[1].replace("<","").replace("@","").replace(">","")} está incorreto.`)
                                ]});
                            });
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