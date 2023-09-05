const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelCommands,roleMute, channelGeneralLog } = require('../../config.json')

module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelCommands) return;
        if (message.content.startsWith(`${prefix}vip` || message.content.startsWith(`${prefix}ajuda`)|| message.content.startsWith(`${prefix}help`))) {
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`
                
                Confira abaixo todos os comandos: 
                Comandos VIP:

                ic!addtag @usuario ou id
                ic!removetag @usuario ou id
                ic!mudartag nome novo da tag
                ic!mudarcall nome novo da call
                ic!limitecall 10
                `)
            ]});
        }
		
  
    
    
    
    
    
    
    
    
    },
};