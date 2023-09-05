const { insertHour } = require("../../database/handlerDB");
const { guildId } = require('../../config.json')

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldMember, newMember) {

        if (newMember.guild.id != guildId) return

	const ChOld = await oldMember.channelId ==null ||  oldMember.selfMute ? "" :oldMember.channelId
            const ChNew = await newMember.channelId ==null || newMember.selfMute ? "" :newMember.channelId
                
                        if(     oldMember.serverDeaf!= newMember.serverDeaf ) return
                        if(     oldMember.serverMute!= newMember.serverMute ) return
                        if(     oldMember.selfVideo!= newMember.selfVideo ) return
                        if(     oldMember.streaming!= newMember.streaming ) return
                        if(     oldMember.sessionId!= newMember.sessionId ) return
                        if(     oldMember.supress!= newMember.supress ) return
                        if(     oldMember.requestToSpeakTimestamp!= newMember.requestToSpeakTimestamp ) return          

                if(oldMember.channelId != newMember.channelId  && !newMember.selfMute){
                        await insertHour(newMember.id, ChOld, ChNew)
                }else if (oldMember.channelId == newMember.channelId && newMember.selfMute ){
                        await insertHour(newMember.id, ChOld, '')
                }else if (oldMember.channelId == newMember.channelId && !newMember.selfMute ){
                                        
                        await insertHour(newMember.id, ChOld, ChNew)
                }
		// const ChOld = await oldMember.channelId ==null ||  oldMember.selfMute ? "" :oldMember.channelId
        //     const ChNew = await newMember.channelId ==null || newMember.selfMute ? "" :newMember.channelId
                
        //                 if(     oldMember.serverDeaf!= newMember.serverDeaf ) return
        //                 if(     oldMember.serverMute!= newMember.serverMute ) return
        //                 if(     oldMember.selfVideo!= newMember.selfVideo ) return
        //                 if(     oldMember.streaming!= newMember.streaming ) return
        //                 if(     oldMember.sessionId!= newMember.sessionId ) return
        //                 if(     oldMember.supress!= newMember.supress ) return
        //                 if(     oldMember.requestToSpeakTimestamp!= newMember.requestToSpeakTimestamp ) return          

        //         if(oldMember.channelId != newMember.channelId  && !newMember.selfMute){
        //                 await insertHour(newMember.id, ChOld, ChNew)
        //         }else if (oldMember.channelId == newMember.channelId && newMember.selfMute ){
        //                 await insertHour(newMember.id, ChOld, '')
        //         }else if (oldMember.channelId == newMember.channelId && !newMember.selfMute ){
                                        
        //                 await insertHour(newMember.id, ChOld, ChNew)
        //         }

		//console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
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
