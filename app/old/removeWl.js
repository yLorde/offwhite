const removeWl = require('../database/whitelist/remove')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removewl')
		.setDescription('Remova o usuário da Whitelist da Cidade Illuminatti!')
		//.setRequired(true)
		.addStringOption(option => option.setName('id').setDescription('ID do usuário').setRequired(true)),


	async execute(interaction) {
		try {
			const id = interaction.options.getString('id')
			removeWl(id)
			await interaction.reply({ content: "Localizando..."})
		 	await  interaction.deleteReply()
		} catch (error) {
			 interaction.reply('Algum erro aconteceu, consulte o admin do BOT.')
			
		}
		


		

	},
};