const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelVip,channelGeneralLog } = require('../../config.json')
const {checkPerm, countCommand, insertPunish, isPunish, checkBe} = require('../../database/handlerDB');

const wait = require("timers/promises").setTimeout;


module.exports = {
    name: 'messageCreate',
async execute(message,client) {
    if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelVip) return;
    if (message.content.startsWith(`${prefix}vip`)) {
       message.delete()
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setTitle('SEJA VIP')
                .setDescription(`
                
                <:right:1005248092779581592> Seja vip e ajude o servidor a se manter ativo

                <:right:1005248092779581592> Tipos e benefícios de VIP

                <a:e13:1002013705229303829> **VIP Padrão:**
                <:point3s:1005248535224143882> Call na área vip com seu nome
                <:point3s:1005248535224143882> Tag exclusiva e modificável
                <:e22:1004543665487745125> **R$9,90 por mês**

                <a:e13:1002013705229303829> ** VIP Plus:**
                <:point3s:1005248535224143882> Call na área vip com nome modificável
                <:point3s:1005248535224143882> Tag exclusiva e modificável
                <:point3s:1005248535224143882> Poder de mutar e desconectar membros em calls públicas
                ⚠ O mute e o desconectar terão que ser usado com motivos.(Não brinque com isso ou perderá o direito)
                <:e22:1004543665487745125> **R$19,90 por mês**

                :rotating_light: Para a compra ou  dúvidas conversar apenas com os <@&995506777963647046>
                
                `)
            ]})

          
        
    }
},
}