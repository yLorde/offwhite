const addRole = require("../../rawCommands/addRole");
const removeRole = require("../../rawCommands/removeRole");
const { 
	channelRegister,
	roleRP, roleSocial, msgIdAcesso, 
	roleNotiGeral,
	roleNotiInst,
	roleNotVIP,
	roleNotStream,
	roleNotSModServ,
	roleMasculino,
	roleFeminino,
	roleNaobi,
	roleM18,
	rolem18,
	roleHetero,
	roleLGBT,
	roleSolteiro,
	roleCasado,
	roleEnrolado,
	roleEncalhado,
	roleNaPutaria,
	roleNorte,
	roleNordeste,
	roleSudeste,
	roleSul,
	roleCentro,
	roleEstudante,
	roleTrabalhador,
	roleVagabundo,

	msgIdGenero,
	msgIdSexo,
	msgIdIdade,
	msgIdRelacionamento,
	msgIdRegiao,
	msgIdOcupacao,

	guild

 } = require('../../config.json')
const msgIdWelcome = "1004367124803887194"
const channelIdAcesso = "1004362035015987290"

const msgIdNoti = "1004908215877767188"
const chanelIdNoti = "1004348010551070810"
const wait = require("timers/promises").setTimeout;
	

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction,user,client) {
		const { message } = reaction
		if(message.channelId == channelRegister){

			//Genero
			if(message.id ==msgIdGenero &&  reaction.emoji.name=="♂️"){
			addRole(roleMasculino,user.id)
			await wait(10000);	
			removeRole(roleFeminino,user.id)
			await wait(10000);
			removeRole(roleNaobi,user.id)
		}
		if(message.id ==msgIdGenero &&  reaction.emoji.name=="♀️"){
			addRole(roleFeminino,user.id)
			await wait(10000);
			removeRole(roleMasculino,user.id)
			await wait(10000);
			removeRole(roleNaobi,user.id)
		} 
		if(message.id ==msgIdGenero &&  reaction.emoji.name=="naobi"){
			addRole(roleNaobi,user.id)
			await wait(10000);
			removeRole(roleMasculino,user.id)
			await wait(10000);
			removeRole(roleFeminino,user.id)
		} 
		//Sexualidade
		if(message.id ==msgIdSexo &&  reaction.emoji.name=="👬"){
			addRole(roleLGBT,user.id)
			await wait(10000);
			removeRole(roleHetero,user.id)
		}
		if(message.id ==msgIdSexo &&  reaction.emoji.name=="👫"){
			addRole(roleHetero,user.id)
			await wait(10000);
			removeRole(roleLGBT,user.id)
		}
		//Idade
		if(message.id ==msgIdIdade &&  reaction.emoji.name=="1️⃣"){
			addRole(roleM18,user.id)
			await wait(10000);
			removeRole(rolem18,user.id)
		}
		if(message.id ==msgIdIdade &&  reaction.emoji.name=="2️⃣"){
			addRole(rolem18,user.id)
			await wait(10000);
			removeRole(roleM18,user.id)
		}
		//Relacionamento
		if(message.id ==msgIdRelacionamento &&  reaction.emoji.name=="1️⃣"){
			addRole(roleSolteiro,user.id)
			await wait(10000);
			removeRole(roleCasado,user.id)
			await wait(10000);
			removeRole(roleEnrolado,user.id)
			await wait(10000);
			removeRole(roleEncalhado,user.id)
			await wait(10000);
			removeRole(roleNaPutaria,user.id)
		}
		if(message.id ==msgIdRelacionamento &&  reaction.emoji.name=="2️⃣"){
			addRole(roleCasado,user.id)
			await wait(10000);
			removeRole(roleSolteiro,user.id)
			await wait(10000);
			removeRole(roleEnrolado,user.id)
			await wait(10000);
			removeRole(roleEncalhado,user.id)
			await wait(10000);
			removeRole(roleNaPutaria,user.id)
		}
		if(message.id ==msgIdRelacionamento &&  reaction.emoji.name=="3️⃣"){
			addRole(roleEnrolado,user.id)
			await wait(10000);
			await wait(10000);
			removeRole(roleSolteiro,user.id)
			await wait(10000);
			removeRole(roleCasado,user.id)
			await wait(10000);
			removeRole(roleEncalhado,user.id)
			await wait(10000);
			removeRole(roleNaPutaria,user.id)
		}
		if(message.id ==msgIdRelacionamento &&  reaction.emoji.name=="4️⃣"){
			addRole(roleEncalhado,user.id)
			await wait(10000);
			removeRole(roleSolteiro,user.id)
			await wait(10000);
			removeRole(roleCasado,user.id)
			await wait(10000);
			removeRole(roleEnrolado,user.id)
			await wait(10000);
			removeRole(roleNaPutaria,user.id)
		}
		if(message.id ==msgIdRelacionamento &&  reaction.emoji.name=="5️⃣"){
			addRole(roleNaPutaria,user.id)
			removeRole(roleSolteiro,user.id)
			await wait(10000);
			removeRole(roleCasado,user.id)
			await wait(10000);
			removeRole(roleEnrolado,user.id)
			await wait(10000);
			removeRole(roleEncalhado,user.id)
		}
		//Região
		if(message.id ==msgIdRegiao &&  reaction.emoji.name=="1️⃣"){
			
			addRole(roleNorte,user.id)
			await wait(10000);
			removeRole(roleNordeste,user.id)
			await wait(10000);
			removeRole(roleCentro,user.id)
			await wait(10000);
			removeRole(roleSudeste,user.id)
			await wait(10000);
			removeRole(roleSul,user.id)
		}
		if(message.id ==msgIdRegiao &&  reaction.emoji.name=="2️⃣"){
			
			addRole(roleNordeste,user.id)
			await wait(10000);
			removeRole(roleNorte,user.id)
			await wait(10000);
			removeRole(roleCentro,user.id)
			await wait(10000);
			removeRole(roleSudeste,user.id)
			await wait(10000);
			removeRole(roleSul,user.id)
		}
		if(message.id ==msgIdRegiao &&  reaction.emoji.name=="3️⃣"){
			addRole(roleCentro,user.id);
			await wait(10000);
			removeRole(roleNorte,user.id);
			await wait(10000);
			removeRole(roleNordeste,user.id);
			await wait(10000);
			removeRole(roleSudeste,user.id);
			await wait(10000);
			removeRole(roleSul,user.id)
		}
		if(message.id ==msgIdRegiao &&  reaction.emoji.name=="4️⃣"){
			addRole(roleSudeste,user.id);
			await wait(10000);
			removeRole(roleNorte,user.id);
			await wait(10000);
			removeRole(roleNordeste,user.id);
			await wait(10000);
			removeRole(roleCentro,user.id);
			await wait(10000);
			removeRole(roleSul,user.id)
		}
		if(message.id ==msgIdRegiao &&  reaction.emoji.name=="5️⃣"){
			addRole(roleSul,user.id)
			await wait(10000);
			removeRole(roleNorte,user.id);
			await wait(10000);
			removeRole(roleNordeste,user.id);
			await wait(10000);
			removeRole(roleCentro,user.id);
			await wait(10000);
			removeRole(roleSudeste,user.id);
		}
		//Ocupação
		if(message.id ==msgIdOcupacao &&  reaction.emoji.name=="1️⃣"){
			addRole(roleEstudante,user.id);
			await wait(10000);
			removeRole(roleTrabalhador,user.id);
			await wait(10000);
			removeRole(roleVagabundo,user.id)
			
		}
		if(message.id ==msgIdOcupacao &&  reaction.emoji.name=="2️⃣"){
			addRole(roleTrabalhador,user.id);
			await wait(10000);
			removeRole(roleEstudante,user.id);
			await wait(10000);
			removeRole(roleVagabundo,user.id)
			
		}
		if(message.id ==msgIdOcupacao &&  reaction.emoji.name=="3️⃣"){
			addRole(roleVagabundo,user.id)
			await wait(10000);
			removeRole(roleEstudante,user.id);
			await wait(10000);
			removeRole(roleTrabalhador,user.id);
			
			
		}
		

		
		
		
	}

	},
};