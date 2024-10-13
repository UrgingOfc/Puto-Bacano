const { REST, Routes } = require("discord.js");
const config = require("../config.json");

function LoadCommands(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Commands", "Status");
    const folders = fs.readdirSync("./commands");
    let commandsArray = [];

    for (const folder of folders) {
        const files = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));
        for (const file of files) {
            const command = require(`../commands/${folder}/${file}`);
            const properties = { folder, ...command };
            
            delete require.cache[require.resolve(`../commands/${folder}/${file}`)];
            
            client.commands.set(command.data.name, properties);
            commandsArray.push(command.data.toJSON());
            table.addRow(file, "Loaded");
        }
    }
    const rest = new REST({ version: '10' }).setToken(config.token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(config.clientId, config.guildId),
                { body: commandsArray }
            );
            console.log(`\n${table.toString()}`, `\nCommands Loaded!\n`);
        } catch (error) {
            console.error('Error refreshing commands:', error);
        }
    })();
}

module.exports = { LoadCommands };
