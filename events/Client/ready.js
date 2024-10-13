const config = require("../../config.json");

const { EmbedBuilder } = require("discord.js");
const { scheduleJob } = require("node-schedule");

module.exports = {
    name: "ready",
    once: false,
    execute (client) {
        console.log(`Bot carregado como ${client.user.username}!`);

        const aniversarios = require("../../aniversarios.json");
        Object.values(aniversarios).forEach((aniversario) => {
            var data = new Date();
            var dataHoje = new Date(data.getFullYear(), data.getMonth(), data.getDate());
            var dataAniv = new Date(data.getFullYear(), Number(aniversario.mes) - 1, Number(aniversario.dia));

            const embed = new EmbedBuilder()
            const channel = client.guilds.cache.get(config.guildId).channels.cache.get("1294996443454636123");

            if (dataHoje.getTime() == dataAniv.getTime()) {
                embed.setTitle("Aniversário");
                embed.setDescription(`🥳 Hoje é o aniversário do <@${aniversario.idDiscord}>!`)
                embed.setColor("Random");
                channel.send({ content: `@everyone`, embeds: [embed] }).then((msg) => {
                    msg.react("🥳");
                });
            }
            
            scheduleJob(dataAniv, () => {
                embed.setTitle("Aniversário");
                embed.setDescription(`🥳 Hoje é o aniversário do <@${aniversario.idDiscord}>!`)
                embed.setColor("Random");
                channel.send({ content: `@everyone`, embeds: [embed] }).then((msg) => {
                    msg.react("🥳");
                });
            });
        });
    }
}