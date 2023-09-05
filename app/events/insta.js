const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix, channelInsta } = require('../config.json')




module.exports = {
    name: 'messageCreate',
	async execute(message,client) {
        if ( message.author.bot || message.channelId != channelInsta) return;
        message.react('👍')
        message.react('❤')
        
        
    },
};