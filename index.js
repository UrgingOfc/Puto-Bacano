const { Client, GatewayIntentBits, Partials, Collection, REST, Routes } = require("discord.js");
const config = require("./config.json");

const { LoadCommands } = require("./handlers/commandHandler");
const { LoadEvents } = require("./handlers/eventHandler.js");

const { configureGenkit } = require("@genkit-ai/core");
const { googleAI } = require("@genkit-ai/googleai");

const intents = [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessagePolls,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessagePolls,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
]

const partials = [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User
]

const client = new Client({ intents: intents, partials: partials });

client.commands = new Collection();

configureGenkit({
    plugins: [googleAI({
        apiKey: 'AIzaSyA-WIiJ17dm2xlGU9MRGHlvDDfFQ5tKyQc', 
        apiVersion: 'v1beta' 
    })]
});

client.login(config.token).then(() => {
    LoadCommands(client);
    LoadEvents(client);
});