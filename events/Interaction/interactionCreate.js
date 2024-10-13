module.exports = {
    name: "interactionCreate",
    once: false,
    execute(interaction, client) {
        const command = client.commands.get(interaction.commandName);

        if (!interaction.isChatInputCommand()) return;
        if (!command) {
            return interaction.reply({ content: "Este comando não existe mais!", ephemeral: true });
        }
        return command.execute(interaction, client);
    }
}