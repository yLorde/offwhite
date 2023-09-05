const { MessageEmbed } = require("discord.js");
const {  cancelMov, callProcedure, callProcedureId } = require("../../database/handlerDB");
const { guildId,channelGeneralLog } = require("../../config.json")
const sendMessage = require('../../rawCommands/sendMessage')
module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldMember, newMember,client) {
		
                
        if( oldMember.serverDeaf!= newMember.serverDeaf ) return
        if( oldMember.serverMute!= newMember.serverMute ) return
        if( oldMember.selfVideo!= newMember.selfVideo ) return
        if( oldMember.streaming!= newMember.streaming ) return
        if( oldMember.sessionId!= newMember.sessionId ) return
        if( oldMember.supress!= newMember.supress ) return
        if( oldMember.requestToSpeakTimestamp!= newMember.requestToSpeakTimestamp ) return          
        const time = 800*1000
        const checkMove = ()=>{
                const guild = client.guilds.cache.get(guildId);
                const user = client.guilds.cache.find((guild) => guild.id === guildId).members.cache.find((member) => member.user.id === newMember.id);
           setTimeout(()=>{
                if(user.voice.channelId==null || user.voice.selfMute){
                    cancelMov(newMember.id).then((res)=>{
                        if(res[0][0].cMov>0){
                            user.send({embeds: [new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`Você ficou mais de 5 minutos ausente ou silenciado e sua MOV foi cancelada.`)
                            ]});
                            sendMessage({embeds: [new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`<@${user.id}> Você ficou mais de 5 minutos ausente ou silenciado e sua MOV foi cancelada.`)
                            ]},channelGeneralLog)
                        }
                    })
                }     
           },time)
        }
                if (oldMember.channelId == newMember.channelId && newMember.selfMute ){
                    callProcedureId("getMovOpen",newMember.id).then(res=>{
                        if(res.count>0){
                            checkMove()
                        }
                    })  
                    }	 
                if(newMember.channelId==null){
                    callProcedureId("getMovOpen",newMember.id).then(res=>{
                        if(res.count>0){
                            checkMove()
                        }
                    }) 
                }
	},
};

// serverDeaf: false,
//     serverMute: false,
//     selfDeaf: false,
//     selfMute: false,
//     selfVideo: false,
//     sessionId: 'a876da78d12eede845e28cdbb8840f55',
//     streaming: false,
//     channelId: null,