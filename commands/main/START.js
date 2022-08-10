const util = require('minecraft-server-util');

module.exports = {
    name: "start",
    category: "main",
    permissions: [],
    devOnly: false,
    run: async ({bot, message, args}) => {
        message.channel.send("asking to start...")
    }
}