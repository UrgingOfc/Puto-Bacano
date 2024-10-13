const bot = require("../../bot");
const config = require("../../config.json");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    execute (member, client) {
        const messages = [
            `Mekieeee ${member.user}`,
            `Olha só se não é o ${member.user} que aterrou aqui!`,
            `Ganda ${member.user}, bem-vindo ao servidor!`,
            `${member.user}, espero que te divirtas! ;)`,
        ];

        const message = bot.getRandomValue(messages);

        const guild = client.guilds.cache.get(config.guildId);
        const channel = guild.channels.cache.get("1255595956305661955");
        channel.send({ content: message });
        member.send({ content: `Mekieee ${member.user}, tudo fixe ou quê?\n\nReparei que entraste no discord dos bacanos. Eu sou um simples bot programado pelo Urging que lhes ajuda para nada, mas que fui feito pela diversão mesmo\n\nChega de bla blas, queria apenas te informar que estás na lista de espera para seres aprovado no discord. É normal não teres nenhum acesso ao discord pois ainda não sabemos que tu és, mas não te preocupes, se for para ficares cá, vais receber as autorizações depois! :)\n\nFica bem,\nTeu assistente profissional\nO Puto Bacano` }).catch(() => {
            console.error(`O bot não conseguiu mandar a mensagem de boas-vindas nas DMs do ${member.user.username}!`);
        })
    }
}