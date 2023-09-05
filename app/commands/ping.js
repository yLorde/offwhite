const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new  SlashCommandBuilder()
		.setName('pinga')
		.setDescription('Replies with Pong!GLOBAL'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};
