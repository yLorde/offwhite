
const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,channelGeneralLog, roleAdminStaff, roleFounder, roleStaff, roleFirstStaff } = require('../../config.json')
const { insertStaff} = require('../../database/handlerDB');

const sendMessage = require('../../rawCommands/sendMessage')


module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        
        if (message.content.startsWith(`${prefix}addstaff`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const modId = await message.author.id

            if( args.length<=2 || args[2]=='founders' || args[2]=='founder'){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o ID do usuário e a área staff.
                    Exemplo: ${prefix}addStaff 22222 movCall `)
                ]})
                return;
            }

            const mod =  await message.guild.members.cache.get(modId)
            
            if( !mod.roles.member.roles.cache.some(role => role.id === roleAdminStaff || role.id === roleFounder) ) {
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Sem permissão')
                    .setDescription(`Você não tem permissão para executar este comando.`)
                ]})
                return
            }

            try {             
                const staff =  await message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
                    
                if(staff==undefined){
                        message.channel.send({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`Este usuário não está no servidor.`)
                    ]});
                    message.react('⚠');
                    return;
                }
            
                client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user) => {
                    insertStaff(args[1].replace("<","").replace("@","").replace(">",""), message.author.id, args[2]).then(res=>{
                        
                        const roleIdFromQuery = res[0][0].role_id
                        if(roleIdFromQuery =='' | roleIdFromQuery ==undefined || roleIdFromQuery ==null) return
                        
                        staff.roles.add(roleIdFromQuery).then(()=>{
                            staff.roles.add(roleStaff)
                            //staff.roles.add(roleFirstStaff)
                            message.react('✅');
                            message.channel.send({embeds: [new MessageEmbed()
                                .setColor("GREEN")
                                .setDescription(`O ID <@${args[1].replace("<","").replace("@","").replace(">","")}> foi adicionado a area desejada.`)
                            ]});

                            sendMessage({embeds: [new MessageEmbed()
                                .setColor("YELLOW")
                                .setDescription(`<@${message.author.id}> adicionou o  <@${args[1].replace("<","").replace("@","").replace(">","")}> à área ${args[2]}.`)
                            ]},channelGeneralLog)
                        })
                    }).catch(error=>{
                        message.react('⚠');
                        if(error.code == 'ER_DUP_ENTRY'){
                            message.channel.send({embeds: [new MessageEmbed()                            
                                .setColor("YELLOW")
                                .setDescription(`O usuário já foi adicionado a Staff.`)
                            ]}); 
                        }else{
                            message.channel.send({embeds: [new MessageEmbed()                            
                                .setColor("RED")
                                .setDescription(`O Usuário não pode ser adicionado nesta área, pois ela não existe.`)
                            ]});

                        }
                        
                    })

                }); 

                } catch (error) {
                    console.log(error)
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`Verique se a area da Staff foi digitado corretamente.`)
                    ]});
                    message.react('❌');

                }
            }
         
    },
};