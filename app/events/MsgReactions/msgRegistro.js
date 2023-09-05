const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelRegister,channelGeneralLog } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, isPunish, checkBe} = require('../../database/handlerDB');

const wait = require("timers/promises").setTimeout;


module.exports = {
    name: 'messageCreate',
async execute(message,client) {
    if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelRegister) return;
    if (message.content.startsWith(`${prefix}registro`)) {
       message.delete()
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("NAVY")
                .setTitle('Registre')
                .setDescription(`
                
                Olá pessoas lindas,
                agora que você entrou para o server e se tornou uma pessoa iluminada,
                que tal fazer aquele registro básico? Lembre-se, não somos um server como os outros
                não minta o que você é, se por acaso mentir terá consequências!

                Reaja aos emojis para se registar
                
                `)
            ]})

            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("NAVY")
                .setTitle('Gênero:')
                .setDescription(`
                :male_sign:Masculino  :female_sign:Feminino  <:naobi:1021744245675143279>Não-Binário 
                `)
            ]}).then(embedMessage => {
                embedMessage.react("♂️");
                embedMessage.react("♀️");
                embedMessage.react("<:naobi:1021744245675143279>");
            });
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("NAVY")
                .setTitle('Sexualidade:')
                .setDescription(`
                :couple: Hétero  :two_men_holding_hands: LGBTQIA+ 
                `)
            ]}).then(embedMessage => {
                embedMessage.react("👫");
                embedMessage.react("👬");
            });
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("NAVY")
                .setTitle('IDADE:')
                .setDescription(`
                1️⃣+18 2️⃣-18
                `)
            ]}).then(embedMessage => {
                embedMessage.react('1️⃣');
                embedMessage.react('2️⃣');
            });
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("NAVY")
                .setTitle('Relacionamento:')
                .setDescription(`
                1️⃣Solteiro(a) 2️⃣Casado(a) 3️⃣Enrolado(a) 4️⃣Encalhado(a) 5️⃣Na Putaria
                `)
            ]}).then(embedMessage => {
                embedMessage.react('1️⃣');
                embedMessage.react('2️⃣');
                embedMessage.react('3️⃣');
                embedMessage.react('4️⃣');
                embedMessage.react('5️⃣');
            });
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("NAVY")
                .setTitle('Região onde mora:')
                .setDescription(`
                1️⃣Norte 2️⃣Nordeste 3️⃣Centro-Oeste 4️⃣Sudeste 5️⃣Sul
                `)
            ]}).then(embedMessage => {
                embedMessage.react('1️⃣');
                embedMessage.react('2️⃣');
                embedMessage.react('3️⃣');
                embedMessage.react('4️⃣');
                embedMessage.react('5️⃣');
            });
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("NAVY")
                .setTitle('Ocupação:')
                .setDescription(`
                1️⃣Estudante 2️⃣Trabalhador 3️⃣Vagabundo
                `)
            ]}).then(embedMessage => {
                embedMessage.react('1️⃣');
                embedMessage.react('2️⃣');
                embedMessage.react('3️⃣');
            });
            
        
    }
},
}