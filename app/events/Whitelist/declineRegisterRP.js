const { roleModRegisterId} = require('../../config.json')
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
            try {
                  if(interaction.customId==="decline-register"){
                  if(!interaction.member.roles.cache.has(roleModRegisterId)){
                        return await interaction.reply({content: "Você não tem permissão para executar este comando.", ephemeral: true})
                        }else{
                  
                  const id=  interaction.message.embeds[0].footer.text
                        interaction.message.delete()
                        interaction.reply({ content: `O ID ${id} foi rejeitado.`, });
                  }
                        }
            } catch (error) {
                  console.log(error)
            }

      }
}




