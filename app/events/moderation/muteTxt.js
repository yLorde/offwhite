const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,roleMuteTxt, channelGeneralLog } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, isPunish, checkBe} = require('../../database/handlerDB');
const addRole = require('../../rawCommands/addRole')
const removeRole = require('../../rawCommands/removeRole')
const sendMessage = require('../../rawCommands/sendMessage')

const setRoleMuteTxt=(id,sec)=>{
    addRole(roleMuteTxt,id)
    setTimeout(()=>removeRole(roleMuteTxt,id),sec*1000)
}

module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}mutarchat`)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const staffId = message.author.id
            if( args.length<=2){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o ID do usuário e o Motivo.
                    Exemplo: ${prefix}mutarchat 22222222 Xingando a galera`)
                ]})
                return;
            }
            const canBePunish = await checkBe(args[1].replace("<","").replace("@","").replace(">",""),"mutetxt")
            //Check Perm DB
            checkPerm(staffId).then(res=>{
                if(res && canBePunish){
                    client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user) => {
                        countCommand(args[1].replace("<","").replace("@","").replace(">",""),"mutetxt").then((res)=>{
                            const victim =  message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
                                const {total} = res
                                if(total==0){
                                    const timeMutetxt =10*60
                                    insertPunish(staffId,'mutetxt',args.slice(2).join(' '),args[1].replace("<","").replace("@","").replace(">",""),timeMutetxt)
                                    setRoleMuteTxt(args[1].replace("<","").replace("@","").replace(">",""),timeMutetxt)
                                    sendMessage({embeds: [new MessageEmbed()
                                        .setColor("YELLOW")
                                        .setDescription(`<@${staffId}> mutou o <@${args[1].replace("<","").replace("@","").replace(">","")}> pelo motivo ${args.slice(2).join(' ')}`)
                                    ]},channelGeneralLog)
                                    message.channel.send({embeds: [new MessageEmbed()
                                        .setColor("PURPLE")
                                        .setDescription(`O <@${args[1].replace("<","").replace("@","").replace(">","")}> foi mutado com sucesso.`)
                                    ]});
                                    message.react('✅');
                                }else{
                                    isPunish(args[1].replace("<","").replace("@","").replace(">",""),'mutetxt').then(res=>{
                                        if(res){
                                            message.channel.send({embeds: [new MessageEmbed()
                                                .setColor("RED")
                                                .setDescription(`<@${args[1].replace("<","").replace("@","").replace(">","")}> já foi mutado. Aguarde finalizar a punição anterior para adicionar outra.`)
                                            ]});
                                            message.react('⚠');
                                        }else{
                                            const timeMutetxt =total*15*60
                                            insertPunish(staffId,'mutetxt',args.slice(2).join(' '),args[1].replace("<","").replace("@","").replace(">",""),timeMutetxt)
                                            setRoleMuteTxt(args[1].replace("<","").replace("@","").replace(">",""),timeMutetxt)
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