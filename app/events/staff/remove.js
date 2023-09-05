
const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands, channelGeneralLog, roleAdminStaff, roleFirstStaff,roleStaff, roleFounder } = require('../../config.json')
const { removeStaff} = require('../../database/handlerDB');
const sendMessage = require('../../rawCommands/sendMessage')



module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        
        if (message.content.startsWith(`${prefix}removestaff`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);
            const modId = await message.author.id
            
            if( args.length<=1 ){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o ID do staff.
                    Exemplo: ${prefix}removeStaff 22222`)
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
                const staff = message.guild.members.cache.get(args[1].replace("<","").replace("@","").replace(">",""))
                    
                if(staff==undefined){
                        message.channel.send({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`Este usuário não está no servidor.`)
                    ]});
                    message.react('⚠');
                    //return;
                }
            
                client.users.fetch(args[1].replace("<","").replace("@","").replace(">",""), false).then((user) => {
                    removeStaff(args[1].replace("<","").replace("@","").replace(">","")).then(res=>{
                        const roleIdFromQuery = res[0][0].role_id
                        if( roleIdFromQuery == '' | roleIdFromQuery ==undefined || roleIdFromQuery ==null) return
                        staff.roles.remove(roleIdFromQuery).then(()=>{
                            staff.roles.remove(roleStaff)
                            //staff.roles.remove(roleFirstStaff)
                            message.react('✅');
                            message.channel.send({embeds: [new MessageEmbed()
                                .setColor("GREEN")
                                .setDescription(`O ID ${args[1].replace("<","").replace("@","").replace(">","")} foi removido da Staff.`)
                            ]});

                            sendMessage({embeds: [new MessageEmbed()
                                .setColor("YELLOW")
                                .setDescription(`<@${message.author.id}> removeu o  <@${args[1].replace("<","").replace("@","").replace(">","")}> da Staff.`)
                            ]},channelGeneralLog)
                        })
                    }).catch(error=>{
                        console.log(error)
                        message.react('⚠');
                       
                            message.channel.send({embeds: [new MessageEmbed()                            
                                .setColor("RED")
                                .setDescription(`O Usuário não pode ser removido desta área, consulte os founders.`)
                            ]});

                        
                        
                    })

                }); 

                } catch (error) {
                    console.log(error)
                    message.react('❌');

                }
            }
         
    },
};