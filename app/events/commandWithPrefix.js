const prefix = "dev!";
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        if (message.content.startsWith(`${prefix}ping`)) {
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`Ping ${ client.ws.ping}ms`)
            ]});

            message.react('😄');
        }
		
  
    
    
    
    
    
    
    
    
    },
};