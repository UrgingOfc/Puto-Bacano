const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Limpa um certo número de mensagens no chat")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => 
            option.setName("quantidade")
                .setDescription("Número de mensagens a serem limpas")
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const quantidade = interaction.options.getInteger("quantidade");

        if (!interaction.channel.isTextBased()) {
            return interaction.reply({ content: "Este comando só pode ser usado em canais de texto.", ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            const deletedMessages = await interaction.channel.bulkDelete(quantidade, true);
            interaction.channel.send({ content: `Foram apagadas ${deletedMessages.size} mensagens deste canal por ${interaction.user}!` });
            interaction.editReply({ content: `Foram apagadas ${deletedMessages.size} mensagens com sucesso!\n\nCertas mensagens só podem ser apagadas somente caso tenham menos de 14 dias (Culpa é do Discord, não minha).`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.editReply({ content: "Ocorreu um erro ao tentar apagar as mensagens.", ephemeral: true });
        }
    }
}