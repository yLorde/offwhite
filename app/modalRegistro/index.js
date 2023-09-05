const { Modal } =require('discord.js')
const { MessageActionRow, MessageButton, MessageEmbed, TextInputComponent,  } =require('discord.js')

// Creae the modal
 const modal = new Modal()
    .setCustomId('modalRegistro')
    .setTitle('Formulário de Registro na Cidade Illuminatti');
// Add components to modal
const idInput = new TextInputComponent()
    .setCustomId('idInput')
    // The label is the prompt the user sees for this input
    .setLabel("Qual é o seu ID")
    .setMinLength(1)
    // Short means only a single line of text
    .setStyle('SHORT')
    .setRequired(1);
const nameInput = new TextInputComponent()
    .setCustomId('nameInput')
    .setRequired(1)
    // The label is the prompt the user sees for this input
    .setLabel("Qual é o seu nome")
    // Short means only a single line of text
    .setStyle('SHORT');
const aboutRPInput = new TextInputComponent()
    .setCustomId('aboutRPInput')
    .setLabel("Resumo do seu RP?")
    //.setMinLength(100)
    //.setMaxLength(600)
    .setRequired(1)
    // Paragraph means multiple lines of text.
    .setStyle('PARAGRAPH');
// An action row only holds one text input,
// so you need one action row per text input.
const firstActionRow = new MessageActionRow().addComponents(idInput);
const secondActionRow = new MessageActionRow().addComponents(nameInput);
const threeActionRow = new MessageActionRow().addComponents(aboutRPInput);

// Add inputs to the modal
modal.addComponents(firstActionRow, secondActionRow, threeActionRow, );
// Show the modal to the user

module.exports = modal