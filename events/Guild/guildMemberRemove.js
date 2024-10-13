const bot = require("../../bot");
const config = require("../../config.json");

module.exports = {
    name: "guildMemberRemove",
    once: false,
    execute (member, client) {
        const messages = [
            `Atão ${member.user}, quê que se passou? Bazaste pq?`,
            `O otário do ${member.user} decidiu meter o pé daqui para fora!`,
            `Epah aqui também não queriamos aziados, ${member.user}!`,
            `O ${member.user} bazou do discord, que pena! :(`,
        ];

        const message = bot.getRandomValue(messages);

        const guild = client.guilds.cache.get(config.guildId);
        const channel = guild.channels.cache.get("1255595956305661955");
        channel.send({ content: message });
    }
}