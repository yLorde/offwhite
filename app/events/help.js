const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix,channelStaffCommands,roleMute, channelGeneralLog } = require('../config.json')

module.exports = {
    name: 'messageCreate',
	async execute(message,client) {

        // console.log(client)
        // Exit and stop if the prefix is not there or if user is a bot
        if (!message.content.startsWith(prefix) || message.author.bot || message.channelId != channelStaffCommands) return;
        if (message.content.startsWith(`${prefix}help`) || message.content.startsWith(`${prefix}ajuda`)) {
            await message.channel.send({embeds: [new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`
                
                Confira abaixo todos os comandos feitos para a staff: 

                **Comandos de mute**:
                Mutar em call: ic!mutarcall   (ID)   (Motivo)

                Mutar no chat: ic!mutarchat (ID)   (Motivo)
               
                **Comandos de desmutar**:
                Desmutar em call: ic!desmutarcall   (ID)   (Motivo)
               
                Desmutar no chat: ic!desmutarchat   (ID)  (Motivo)
               
                Comando de banir: ic!banir  (ID)   (Motivo);
               
                Comando de desbanir: ic!desbanir  (ID)   (Motivo).
               
                Comandos de mov-call:
               
                Ver o rank de horas em call do servidor: ic!rankcall
               
                Ver as horas de alguém mencionado: ic!usercall  (ID)
               
                **Comandos sobre a mov pelo bot**:
                Para iniciar uma mov's: ic!start
                OBs.: Se ficar mutado/ausente por 5min a Mov é cancelada.
               
                Para ver quantas movs você já realizou: ic!infomov
               
                Para ver o rank de mov's do servidor: ic!movs
               
                Para ver o rank de point's: ic!points


                **Comandos de Contagem de Horas**:
                ic!points: Para ver o rank de pontos.

                ic!mypoints: Para ver seus pontos.

                ic!rankedtimelastweek: Rank de horas da última semana

                ic!rankedtimemonth: Rank de horas mensais

                ic!rankedtime: Rank Geral de horas mensais

                **Comandos para Area de Div:**
                ic!rankeddivmonth: Para ver o ranking mensal de divulgação

                ic!rankdiv: Para ver o rank semanal de divulgação

                ic!rankeddivgeral: Para ver  o ranking geral de divulgação

                ic!rankeddivlastweek: Para ver o raking geral da última semana

                **Comandos para Adminstrador da Staff:**
                ic!addstaff (ID) (area)

                ic!removestaff (ID)

                `)
            ]});
        }
		
  
    
    
    
    
    
    
    
    
    },
};