const { SlashCommandBuilder } = require('@discordjs/builders');
const findId = require('../database/whitelist/findDiscorId')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('findidwl')
		.setDescription('Verifica se o ID esta na Whitelist!')
		.addStringOption(option => option.setName('id').setDescription('ID do usuário').setRequired(true)),
	async execute(interaction) {
		try {
				const id = interaction.options.getString('id')
		res = findId(id)
		 await interaction.reply({ content: "Localizando..."})
		 await  interaction.deleteReply()
		
		} catch (error) {
			console.log(error)
			await interaction.reply({ content: "Um erro aconteceu...."})
		}
	
		
	},
};