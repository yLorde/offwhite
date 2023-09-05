const { SlashCommandBuilder } = require('@discordjs/builders');
const { roleRegistredId, roleRegistredId2, roleWaitRegisterId} = require('../config.json')
const modalRegistro = require('../modalRegistro/index.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('whitelist')
		.setDescription('Registre seu usuário na cidade RP!'),
	async execute(interaction) {
		if(interaction.member.roles.cache.has(roleWaitRegisterId)){
			await interaction.reply({ content: `Você já enviou seu formulário, por favor aguarde nossa equipe verificar.`, ephemeral: true });
		}
		else if(interaction.member.roles.cache.has(roleRegistredId)){
			await interaction.reply({ content: `Você já se registrou ou não tem permissão para executar este comando`, ephemeral: true });
		}else{
			await interaction.showModal(modalRegistro);
		}
	},
};