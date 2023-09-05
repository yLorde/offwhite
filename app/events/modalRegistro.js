
const findId = require('../database/whitelist/findId');
const handlerRegistro = require('../modalRegistro/handlerRegistro')
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
            try {
                        if (interaction.customId === 'modalRegistro') {
                              const id = await interaction.fields.getTextInputValue('idInput');
                              const name = await interaction.fields.getTextInputValue('nameInput');
                              const aboutRP = await interaction.fields.getTextInputValue('aboutRPInput');
                              //console.log(interaction)
                              const userId = await interaction.user.id
                              findId(id).then(
                                    res=>{
                                          if(res.length>0){
                                                handlerRegistro.send2check({ id, name, aboutRP, userId, interaction },interaction.client, interaction)
                                                interaction.reply({ content: 'Seu registro foi enviado, por favor aguarde nossa equipe avaliar!', ephemeral:true});                                    
                                          }else{

                                                interaction.reply({ content: `O id: ${id} não foi encontrado no sistema, verifique se você digitou corretamente o seu ID.`, ephemeral:true});
                                          }
                                          
                                          
                                    }
                              )
                        
                  }
                  
            } catch (error) {
                  console.log(error)
                  
            } 

      }
}




