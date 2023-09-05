const { Client, Message, MessageEmbed } = require("discord.js");
const {  messageLog } = require("../../database/handlerDB");
const { prefix, channelChatGeneral} = require('../../config.json')
module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        if (message.channelId!=channelChatGeneral || message.author.bot) return;
           messageLog(message.author.id)
    
    },
};