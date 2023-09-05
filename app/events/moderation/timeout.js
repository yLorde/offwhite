const { time } = require("@discordjs/builders");
const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,channelGeneralLog } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, isPunish, checkBe} = require('../../database/handlerDB');

const sendMessage = require('../../rawCommands/sendMessage')


module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}castigar`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = await message.author.id
            if( args.length<=3 || isNaN(new Number(args[2])) || new Number(args[2])>99999999 || new Number(args[2])<0 ){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o ID do usuário, Motivo e Tempo em minutos.
                    Exemplo: ${prefix}castigar 22222222 10 Estourando Call `)
                ]})
                return;
            }
           
            const canBePunish = await checkBe(args[1].replace("<","").replace("@","").replace(">",""),"timeout")
            //Check Perm DB
            checkPerm(staffId).then(res=>{
                if(res && canBePunish){
                    client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user) => {
                         countCommand(args[1].replace("<","").replace("@","").replace(">",""),'timeout').then((res)=>{
                            const victim =  message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
                                const {total} = res;
                                function timeout(){
                                    
                                    insertPunish(staffId,'timeout',args.slice(3).join(' '),args[1].replace("<","").replace("@","").replace(">",""),args[2]*60)
                                    victim.timeout(args[2]*6000,args.slice(3).join(' ')).then(()=>{
                                        message.channel.send({embeds: [new MessageEmbed()
                                            .setColor("PURPLE")
                                            .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> foi castigado com sucesso.`)
                                        ]});
                                        message.react('✅');
                                    })

                                    sendMessage({embeds: [new MessageEmbed()
                                        .setColor("YELLOW")
                                        .setDescription(`<@${staffId}> castigou o <@${args[1].replace("<","").replace("@","").replace(">","")}> pelo motivo ${args.slice(3).join(' ')}`)
                                    ]},channelGeneralLog)

                                }
                                if(total==0){
                                    const timeTimeout =10*60
                                    timeout(args[1].replace("<","").replace("@","").replace(">",""),timeTimeout)
                                }else{
                                    isPunish(args[1].replace("<","").replace("@","").replace(">",""),'timeout').then(res=>{
                                        if(res){
                                            message.channel.send({embeds: [new MessageEmbed()
                                                .setColor("RED")
                                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> já foi castigado. Aguarde finalizar a punição anterior para adicionar outra.`)
                                            ]});
                                            message.react('⚠');
                                        }else{
                                            const timeTimeout =total*15*60
                                            timeout(args[1].replace("<","").replace("@","").replace(">",""),timeTimeout)
                                        }
                                    })
                                    
                                }
                            user.send({embeds: [new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`Você foi castigado pelo seguinte motivo:${args.slice(2).join(' ')}`)
                            ]});
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