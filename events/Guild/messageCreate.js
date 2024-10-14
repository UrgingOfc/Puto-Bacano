const { gemini15Flash, gemini15Pro } = require("@genkit-ai/googleai");
const config = require("../../config.json");

const { generate } = require("@genkit-ai/ai");

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message, client) {
        if (message.content.startsWith("<@1294290534088704092>")) {
            const channel = client.guilds.cache.get(config.guildId).channels.cache.get(message.channelId);
            const args = message.content.split(/ +/);

            try {
                console.log(`[Puto Bacano] (Gemini): Gemini Reagiu`)
                const reply = await generate({
                    model: gemini15Pro,
                    prompt: `${args}`
                })
                await channel.send({ content: `🤖 | ${message.author}, ${reply.text()}` });
            } catch (err) {
                await channel.send({ content: `❌ | ${message.author}, Um erro ocorreu ao tentar gerar uma resposta!\n\n${err}\n||<@1172503723369566211>||`});
                console.error(`[Puto Bacano] (Erro Gemini): ${err}`)
            }
        }
    }
}