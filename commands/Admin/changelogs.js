const config = require("../../config.json");

const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("changelogs")
        .setDescription("Envia as últimas updates minhas para o canal")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute(interaction, client) {
        const embed = new EmbedBuilder();
        let updates = "";
        Object.values(config.updates).forEach((update) => {
            updates += `- ${update}\n`;
        })
        embed.setColor("Random");
        embed.setTitle("Puto Bacano - Atualizações");
        embed.setTimestamp(new Date());
        embed.setDescription(`Aqui estão as atualizações de hoje:
        
        ${updates}

        De resto é tudo. Fiquem bem meus putos! ;)`);
        const channel = interaction.guild.channels.cache.get("1295424968921976832");
        channel.send({ content: `Boas maltinha, acabei de receber a minha nova atualização! @everyone`, embeds: [embed] })
        interaction.reply({ content: `Feito! :D`, ephemeral: true });
    }
}