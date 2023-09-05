const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,roleMute, channelGeneralLog } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, isPunish, checkBe} = require('../../database/handlerDB');
const addRole = require('../../rawCommands/addRole')
const removeRole = require('../../rawCommands/removeRole')
const sendMessage = require('../../rawCommands/sendMessage')

const setRoleMute=(id,sec)=>{
    addRole(roleMute,id)
    setTimeout(()=>removeRole(roleMute,id),sec*1000)
}

module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}mutarcall`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = await message.author.id
            if( args.length<=2){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o ID do usuário e o Motivo.
                    Exemplo: ${prefix}mutarcall 22222222 Estourando Call`)
                ]})
                return;
            }
            const canBePunish = await checkBe(args[1].replace("<","").replace("@","").replace(">",""),"mute")
            //Check Perm DB
            checkPerm(staffId).then(res=>{
                if(res && canBePunish){
                    client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user) => {
                         countCommand(args[1].replace("<","").replace("@","").replace(">","")).then((res)=>{
                            const victim =  message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
                                const {total} = res
                                if(total==0){
                                    const timeMute =10*60
                                    //const user = message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">","")).voice.setMute(true)
                                    insertPunish(staffId,'mute',args.slice(2).join(' '),args[1].replace("<","").replace("@","").replace(">",""),timeMute)
                                    setRoleMute(args[1].replace("<","").replace("@","").replace(">",""),timeMute)
                                    if(victim.voice.channelId!=null){
                                        victim.voice.setMute(true)
                                        setTimeout(()=>{
                                         victim.voice.setMute(false)
                                        },timeMute*1000)
                                    }
                                    sendMessage({embeds: [new MessageEmbed()
                                        .setColor("YELLOW")
                                        .setDescription(`<@${staffId}> mutou o <@${args[1].replace("<","").replace("@","").replace(">","")}> pelo motivo ${args.slice(2).join(' ')}`)
                                    ]},channelGeneralLog)
                                    message.channel.send({embeds: [new MessageEmbed()
                                        .setColor("PURPLE")
                                        .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> foi mutado com sucesso.`)
                                    ]});
                                    message.react('✅');
                                }else{
                                    isPunish(args[1].replace("<","").replace("@","").replace(">",""),'mute').then(res=>{
                                        if(res){
                                            message.channel.send({embeds: [new MessageEmbed()
                                                .setColor("RED")
                                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> já foi mutado. Aguarde finalizar a punição anterior para adicionar outra.`)
                                            ]});
                                            message.react('⚠');
                                        }else{
                                            const timeMute =total*15*60
                                            insertPunish(staffId,'mute',args.slice(2).join(' '),args[1].replace("<","").replace("@","").replace(">",""),timeMute)
                                            setRoleMute(args[1].replace("<","").replace("@","").replace(">",""),timeMute)
                                            if(victim.voice.channelId!=null){
                                                victim.voice.setMute(true)
                                                setTimeout(()=>{
                                                    victim.voice.setMute(false)
                                                },timeMute)
                                            }

                                            sendMessage({embeds: [new MessageEmbed()
                                                .setColor("YELLOW")
                                                .setDescription(`<@${staffId}> mutou o <@${args[1].replace("<","").replace("@","").replace(">","")}> pelo motivo ${args.slice(2).join(' ')}`)
                                            ]},channelGeneralLog)

                                            message.channel.send({embeds: [new MessageEmbed()
                                                .setColor("PURPLE")
                                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> foi mutado com sucesso.`)
                                            ]});
                                            message.react('✅');
                                        }
                                    })
                                    
                                }
                            user.send({embeds: [new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`Você foi mutado pelo seguinte motivo:${args.slice(2).join(' ')}`)
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