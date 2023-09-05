const { green } = require('colors')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(green(`Ready! Bot nome: ${client.user.tag}`));
		
		client.user.setPresence({
			afk: false,
			status: 'dnd',
			activities: [{
				name: '.gg/offwhite',
				type: 'PLAYING'
			}]
		})
	},
};
