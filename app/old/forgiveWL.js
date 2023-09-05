const forgiveWl = require('../database/whitelist/forgive')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('forgivewl')
		.setDescription('Perdoa o usuário da Whitelist da Cidade Illuminatti!')
		.addStringOption(option => option.setName('id').setDescription('ID do usuário').setRequired(true)),


	async execute(interaction) {
		try {
			const id = interaction.options.getString('id')
			forgiveWl(id)
			interaction.reply(`Localiando o ID.`)
			interaction.deleteReply()
		} catch (error) {
			 interaction.reply('Algum erro aconteceu, consulte o admin do BOT.')
			
		}

	},
};