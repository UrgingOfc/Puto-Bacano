const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const aniversarios = require("../../aniversarios.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("aniversarios")
        .setDescription("Veja os aniversários que existem registados"),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder();
        embed.setTitle("Aniversários")
        embed.setColor("Random");
        embed.setDescription(`Aqui estão os aniversários todos:\n`);
        Object.values(aniversarios).forEach((aniversario) => {
            var data = new Date();
            var dataHoje = new Date(data.getFullYear(), data.getMonth(), data.getDate());
            var dataAniv = new Date(data.getFullYear(), Number(aniversario.mes) - 1, Number(aniversario.dia));

            if (dataHoje.getTime() > dataAniv.getTime()) {
                dataAniv = new Date(data.getFullYear() + 1, Number(aniversario.mes) - 1, Number(aniversario.dia));
                embed.addFields({
                    name: `\u200B`,
                    value: `**<@${aniversario.idDiscord}>**\n${dataAniv.getDate().toString()}/${aniversario.mes}/${dataAniv.getFullYear().toString()}`,
                    inline: true
                })
            } else if (dataHoje.getTime() == dataAniv.getTime()) {
                embed.addFields({
                    name: `\u200B`,
                    value: `🎂 **<@${aniversario.idDiscord}>**\n**ANIVERSÁRIO HOJE** - ${dataAniv.getDate().toString()}/${aniversario.mes}/${dataAniv.getFullYear().toString()}`,
                    inline: true
                })
            } else {
                embed.addFields({
                    name: `\u200B`,
                    value: `**<@${aniversario.idDiscord}>**\n${dataAniv.getDate().toString()}/${aniversario.mes}/${dataAniv.getFullYear().toString()}`,
                    inline: true
                })
            }
        })
        return interaction.editReply({ embeds: [embed], ephemeral: true });
    }
}