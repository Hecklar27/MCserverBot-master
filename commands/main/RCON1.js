const util = require('minecraft-server-util');

module.exports = {
    name: "rcon",
    category: "main",
    permissions: [],
    devOnly: false,
    run: async ({bot, message, args}) => {
        message.reply("asking...")
        const connectOpts = {
            timeout: 1000 * 5
        };
        
        const loginOpts = {
            timeout: 1000 * 5
        };
        const client = new util.RCON();
        (async () => {
            await client.connect('localhost', 25575, connectOpts);
            await client.login('3435', loginOpts);
            
            const reply = await client.execute('time query daytime');
            console.log(reply);
            message.channel.send(reply)

            await client.close();
        })();
    }
}