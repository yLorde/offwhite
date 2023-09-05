const insertWl = require('../database/whitelist/insert')
const { roleRegistredId, roleRegistredId2, roleWaitRegisterId} = require('../config.json')
const { roleModRegisterId} = require('../config.json')

module.exports = {
	name: 'interactionCreate',
    
	async execute(interaction) {
		if(interaction.customId==="accept-register"){
            if(!interaction.member.roles.cache.has(roleModRegisterId)){
                return await interaction.reply({content: "Você não tem permissão para executar este comando.", ephemeral:true})
            }else{
                
                    const data=  await interaction.message.embeds[0].footer.text.split(' ')
                    const id = data[0]
                    const userId = data[1]
                    
                    const modIid =  await interaction.user.id
                    const member =  await interaction.guild.members.cache.find(member => member.id ===userId)
                   
                   // console.log(member.user.username)
                    try {
                        
                        insertWl(userId,modIid,id)
                        member.roles.add(roleRegistredId)
                        member.roles.add(roleRegistredId2)
                        //member.roles.remove(roleUnregistredId)
                        member.roles.remove(roleWaitRegisterId)
                        interaction.message.delete()
                        interaction.reply({content:'Verificando o ID....'})
                        interaction.deleteReply()
                        await interaction.guild.members.cache.find(member => member.id ===userId).setNickname(`${member.nickname} | ${id}`);
                        

                    //await interaction.reply({ content: `O ID ${id} foi adicionado na Whitelist.` });
                    
                } catch (error) {
                    member.roles.remove(roleRegistredId)
                    member.roles.remove(roleRegistredId2)
                    //member.roles.add(roleUnregistredId)
                    member.roles.remove(roleWaitRegisterId)
                    await interaction.reply({ content: "O registro não foi inserido, verique se este registro ja foi adicionado a Whitelist", ephemeral: true})
                    
                    console.log(error)
                }
                
            }
        }
	},

}





