const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,roleFounder, channelGeneralLog } = require('../config.json')
const wait = require("timers/promises").setTimeout;
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        try {
            
            // console.log(client)
            // Exit and stop if the prefix is not there or if user is a bot
            if (!message.content.startsWith(prefix) || message.author.bot || !message.member.roles.cache.some(role =>  role.id === roleFounder)) return;
            if (message.content.startsWith(`${prefix}sorteio`)) {
                
                const args = await message.content.slice(prefix.length).trim().split(/ +/g);
                setTimeout(()=>{

                    message.delete()
                },5000)
                const time = args.slice(1).join(' ').split("%")[2]
                
                if( args.length<=1){
                    await message.channel.send({embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setTitle('Argumento inválido')
                        .setDescription(`Você precisa inserir o título do sorteio, texto e tempo em horas separado por %.
                        Exemplo: ${prefix}sorteio título do sorteio%descrição do sorteio%24`)
                    ]}).then(message=>{
                    setTimeout(()=>{
                        
                        message.delete()
                    },10000)
                })
                return;
            }
            if( time==NaN || time == null || time ==undefined || Number(time)<=0){
                await message.channel.send({embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTitle('Argumento inválido')
                    .setDescription(`Você precisa inserir o título do sorteio, texto e tempo em horas separado por %.
                    Exemplo: ${prefix}sorteio título do sorteio%descrição do sorteio%24`)
                ]}).then(message=>{
                    setTimeout(()=>{
                        message.delete()
                    },10000)
                })
                return;
            }
            
            
            
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("GOLD")
                .setTitle(args.slice(1).join(' ').split("%")[0])
                .setDescription(args.slice(1).join(' ').split("%")[1])
            ]}).then(message=>{
                //message.pin()
                message.react("🎟️")
                setTimeout(()=>{
                    console.log(message)
                    const react = message.reactions.cache.find(react=>react.name ="🎟️")
                    const users = Array.from(react.users.cache.filter(user=> user.bot==false))
                    if(users.length<=0) {
                        message.channel.send({embeds: [new MessageEmbed()
                            .setColor("GOLD")
                            .setTitle("Sorteio Finalizado")
                            .setDescription(`Ninguém participou do sorteio 🙄.`)
                        ]})
                        return
                    }
                    const randonID = Math.floor(users.length * Math.random())
                    
                    const member =  users[randonID][1]
                    console.log(users)
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("GOLD")
                        .setTitle("Sorteio Finalizado")
                        .setThumbnail("https://cdn.discordapp.com/avatars/"+member.id+"/"+member.avatar+".gif")
                        .setDescription(`O ganhador do ${args.slice(1).join(' ').split("%")[0]} foi o <@${member.id}>
                        `)
                    ]})
                },time*3600*1000)
            });
        }
		
    } catch (error) {
        console.log(error)
    }
  
    
    
    
    
    
    
    
    
    },
};