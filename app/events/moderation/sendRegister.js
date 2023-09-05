const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { prefix, channelStaffCommands, channelGeneralLog } = require('../../config.json')
const { checkPerm, countCommand, insertPunish, isPunish, checkBe } = require('../../database/handlerDB');

const sendMessage = require('../../rawCommands/sendMessage')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (!message.content.startsWith(prefix)) return;

        if (message.content.startsWith(`${prefix}sendregister`)) {
            const args = await message.content.slice(prefix.length).trim().split(/ +/g);

            await message.channel.bulkDelete(1);

            await message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Gênero')
                        .setDescription('Selecione aqui o seu gênero')
                        .setColor('#7300dd')
                ],
                components: [
                    new MessageActionRow().addComponents([
                        new MessageButton()
                            .setLabel('Boy')
                            .setStyle('SECONDARY')
                            .setDisabled(true)
                            .setCustomId('registerBoy'),

                        new MessageButton()
                            .setLabel('Girl')
                            .setDisabled(true)
                            .setStyle('SECONDARY')
                            .setCustomId('registerGirl'),

                        new MessageButton()
                            .setLabel('Não Binário')
                            .setStyle('SECONDARY')
                            .setDisabled(true)
                            .setCustomId('registerNaBinario'),

                        new MessageButton()
                            .setLabel('Genero Fluido')
                            .setStyle('SECONDARY')
                            .setDisabled(true)
                            .setCustomId('registerGeneroFluido'),
                    ])
                ]
            });

            await message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Idade')
                        .setDescription('Selecione aqui sua idade')
                        .setColor('#7300dd')
                ],
                components: [
                    new MessageActionRow().addComponents([
                        new MessageButton()
                            .setLabel('+14')
                            .setDisabled(true)
                            .setStyle('SECONDARY')
                            .setCustomId('registerMais14'),

                        new MessageButton()
                            .setLabel('-14')
                            .setDisabled(true)
                            .setStyle('SECONDARY')
                            .setCustomId('registerMenos14'),
                    ])
                ]
            })

            await message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Sexualidade')
                        .setDescription('Selecione aqui sua sexualidade')
                        .setColor('#7300dd')
                ],
                components: [
                    new MessageActionRow().addComponents([
                        new MessageButton()
                            .setLabel('LGTV')
                            .setDisabled(true)
                            .setStyle('SECONDARY')
                            .setCustomId('registerMais14'),

                        new MessageButton()
                            .setLabel('Heterocromia')
                            .setDisabled(true)
                            .setStyle('SECONDARY')
                            .setCustomId('registerMenos14'),
                    ])
                ]
            })

        }
    },
}