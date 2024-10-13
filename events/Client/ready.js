module.exports = {
    name: "ready",
    once: true,
    execute (client) {
        console.log(`Bot carregado como ${client.user.username}!`);
    }
}