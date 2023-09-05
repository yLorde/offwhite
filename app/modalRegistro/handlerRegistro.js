
// at the top of your file
const  { MessageEmbed, MessageActionRow, MessageButton, Client } = require('discord.js');
const { channelWhitelist, roleWaitRegisterId } = require('../config.json')


const handlerRegistro ={

    send2check: (data,client,interaction)=>{

        const buttons = new MessageActionRow()
        .addComponents(
            				new MessageButton()
            					.setCustomId('accept-register')
            					.setLabel('Aceitar')
            					.setStyle('PRIMARY')
                                
            			)
                  .addComponents(
            				new MessageButton()
            					.setCustomId('decline-register')
            					.setLabel('Rejeitar')
            					.setStyle('DANGER')
                                
            			);

        const form2check = new MessageEmbed()
        .setColor('#6942f5')
	    .setTitle(`Registro ID ${data.id} | ${data.name}`)
        .setDescription(data.aboutRP)
        .setFooter({text:`${data.id} ${data.userId}`})
        .setTimestamp()
        
        client.channels.cache.get(channelWhitelist).send({ components:[buttons], embeds: [form2check] })
        const member =  interaction.guild.members.cache.find(member => member.id ===interaction.user.id)
        //add role aguardando registro
        member.roles.add(roleWaitRegisterId)

    }
}



module.exports = handlerRegistro