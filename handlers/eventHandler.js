function LoadEvents(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Events", "Status");
    const folders = fs.readdirSync("./events");
    for (const folder of folders) {
        if (folder !== "Music") {
            const files = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith(".js"));
            for (const file of files) {
                const event = require(`../events/${folder}/${file}`);
                if (event.rest) {
                    if (event.once) {
                        client.rest.once(event.name, (...args) => {
                            event.execute(...args, client);
                        })
                    } else {
                        client.rest.on(event.name, (...args) => {
                            event.execute(...args, client);
                        })
                    }
                } else {
                    if (event.once) {
                        client.once(event.name, (...args) => {
                            event.execute(...args, client);
                        })
                    } else {
                        client.on(event.name, (...args) => {
                            event.execute(...args, client);
                        })
                    }
                }
                table.addRow(file, "Loaded");
                continue;
            }
        }
    }
    return console.log(`\n${table.toString()}`, `\nEvents Loaded!\n`);
}

module.exports = { LoadEvents }