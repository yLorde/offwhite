require('events').EventEmitter.prototype._maxListeners = 100;
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const { connect } = require('./database/connection')
const dbEcho = require('./database/connection-db-echo')
const sendMessage = require('./rawCommands/sendMessage')
const { prefix, channelStaffCommands, channelGeneralLog, guildId } = require('./config.json')
const { insertGuest } = require("./database/handlerDB");
require('events').EventEmitter.defaultMaxListeners = 15

const client = new Client({
	intents: [Intents.FLAGS.GUILDS
		, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES],
	partials: ['MESSAGE', "CHANNEL", "REACTION"]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}
//// Loading Events Files /////
const eventsPath = path.join(__dirname, "events");
const directoriesInEvents = fs.readdirSync(eventsPath, { withFileTypes: true }).filter(item => item.isDirectory())


directoriesInEvents.forEach(dir => {
	loadEventFiles(`events/${dir.name}`)
})

loadEventFiles()

function loadEventFiles(folder = 'events') {
	const eventsPath = path.join(__dirname, folder);

	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		//Injeção de depencia
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	}
}
//// END Loading Events Files /////
client.once('ready', () => {

	dbEcho.connect()
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!' });
	}
});
//--------------------------------------------------------Invite Manager -------------------------->
// Initialize the invite cache

/*
try {
	const invites = new Collection();
	
	
	// A pretty useful method to create a delay without blocking the whole script.
	const wait = require("timers/promises").setTimeout;
	
	client.on("ready", async () => {
	  // "ready" isn't really ready. We need to wait a spell.
 await wait(1000);
 
	  // Loop over all the guilds
	  client.guilds.cache.forEach(async (guild) => {
		  // Fetch all Guild Invites
		const firstInvites = await guild.invites.fetch();
		//console.log(firstInvites)
		// Set the key as Guild ID, and create a map which has the invite code, and the number of uses
		invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
	  });
	});
	
	
	client.on("inviteDelete", (invite) => {
		// Delete the Invite from Cache
		invites.get(invite.guild.id).delete(invite.code);
	});
	  
	client.on("inviteCreate", (invite) => {
		// Update cache on new invites
		//console.log(invite)
		invites.get(invite.guild.id).set(invite.code, invite.uses);
	  });
	
	  
	
	
	  client.on("guildCreate", (guild) => {
		  // We've been added to a new Guild. Let's fetch all the invites, and save it to our cache
		guild.invites.fetch().then(guildInvites => {
			// This is the same as the ready event
			invites.set(guild.id, new Map(guildInvites.map((invite) => [invite.code, invite.uses])));
		})
	});
	  
	client.on("guildDelete", (guild) => {
		// We've been removed from a Guild. Let's delete all their invites
		invites.delete(guild.id);
	  });
	  
	  
	  client.on("guildMemberAdd", async (member) => {
		  // To compare, we need to load the current invite list.
		  const newInvites = await member.guild.invites.fetch()
		// This is the *existing* invites for the guild.
		const oldInvites = invites.get(member.guild.id);
		// Look through the invites, find the one for which the uses went up.
		const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
		// This is just to simplify the message being sent below (inviter doesn't have a tag property)
		const inviter = await client.users.fetch(invite.inviter.id);
		// Get the log channel (change to your liking)
		const logChannel = member.guild.channels.cache.find(channel => channel.id === channelGeneralLog);
		
		//Upgrade Invite list
		 // Loop over all the guilds
		 client.guilds.cache.forEach(async (guild) => {
			 // Fetch all Guild Invites
			 const firstInvites = await guild.invites.fetch();
			//console.log(firstInvites)
			// Set the key as Guild ID, and create a map which has the invite code, and the number of uses
			invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
		});
		
		// A real basic message with t he information we need. 
		if(inviter){
				logChannel.send({embeds: [new MessageEmbed()
					.setColor("GREEN")
					.setTitle('Novo Membro')
				 .setDescription( `${member.user.tag} entrou no servidor usando o convite do(a) ${inviter.tag}. Este convite  fui usado  ${invite.uses} vezes.`)
			 ]})
				 insertGuest(inviter.id, member.user.id).catch(err=>console.log(err))
				}
				else {
					logChannel.send(
						{embeds: [new MessageEmbed()
						 .setColor("YELLOW")
						 .setTitle('Novo Membro')
						 .setDescription( `${member.user.tag} entrou mas não foi possível descobrir a origem do convite.`)
						]}
						);
					}
		
	  });

	} catch (error) {
		console.log(error)
	}
	  
//-------------------------------------------------------- End Invite Manager -------------------------->
*/

client.setMaxListeners(50);
client.login(token);