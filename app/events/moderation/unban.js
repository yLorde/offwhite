
const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,channelGeneralLog,guildId } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, insertForgiven, isPunish, checkBe} = require('../../database/handlerDB');

const sendMessage = require('../../rawCommands/sendMessage')


module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}desbanir`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = await message.author.id
            if( args.length<=2){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o ID do usuário, Motivo e Tempo em minutos.
                    Exemplo: ${prefix}desbanir 22222222 Estourando Call `)
                ]})
                return;
            }
            
            const canBePunish = await checkBe(args[1].replace("<","").replace("@","").replace(">",""),"ban")
            //Check Perm DB
            checkPerm(staffId).then(res=>{
                if(res && canBePunish){
                    client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user) => {
                         countCommand(args[1].replace("<","").replace("@","").replace(">",""),'unban').then((res)=>{

                                const {total} = res;
                                function unban(){
                                    //insertPunish(staffId,'unban',args.slice(2).join(' '),0)
                                    insertForgiven(args[1].replace("<","").replace("@","").replace(">",""),staffId,'mute',args.slice(2).join(' '))

                                    sendMessage({embeds: [new MessageEmbed()
                                        .setColor("YELLOW")
                                        .setDescription(`<@${staffId}> desbaniu o <@${args[1].replace("<","").replace("@","").replace(">","")}> pelo motivo ${args.slice(2).join(' ')}`)
                                    ]},channelGeneralLog)

                                    message.guild.members.unban(args[1].replace("<","").replace("@","").replace(">",""),args.slice(2).join(' ')).then(()=>{

                                        message.channel.send({embeds: [new MessageEmbed()
                                            .setColor("PURPLE")
                                            .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> foi desbanido com sucesso.`)
                                        ]});
                                        message.react('✅');
                                        
                                        sendMessage({embeds: [new MessageEmbed()
                                            .setColor("YELLOW")
                                            .setDescription(`<@${staffId}> desbaniu o <@${args[1].replace("<","").replace("@","").replace(">","")}> pelo motivo ${args.slice(2).join(' ')}`)
                                        ]},channelGeneralLog)
                                    })
                                    
                                }
                                if(total==0){
                                    unban()
                                }else{
                                    isPunish(args[1].replace("<","").replace("@","").replace(">",""),'ban').then(res=>{
                                        if(res){
                                            message.channel.send({embeds: [new MessageEmbed()
                                                .setColor("RED")
                                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> já foi desbanido.`)
                                            ]});
                                            message.react('⚠');
                                        }else{
                                            unban()
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