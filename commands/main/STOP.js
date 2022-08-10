const { access } = require('fs');
const util = require('minecraft-server-util');

var kill = require('tree-kill');
var spawn = require('child_process').spawn;

var MC_SERVER_START_SCRIPT = "C:/Users/Aliba/Desktop/test server/start.bat";
var consolemaster = "serverController"

function searchStr (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

module.exports = {
    name: "stop",
    category: "main",
    permissions: [],
    devOnly: false,
    run: async ({bot, message, args}) => {
        var mcserver;
        if (message.member.roles.cache.some(role => role.name === consolemaster)) {
            message.channel.send("attempting to stop...")
            const options = {
                timeout: 1000 * 5, 
            };
            util.status('localhost', 25565, options)
                .then((result) => {
                    console.log(result)
                    message.channel.send("server is attempting to stop...")
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
                        
                        const reply = await client.execute('stop');
                        console.log(reply);
                        message.channel.send("Console Log: " + reply)

                        await client.close();
                    })();
                })
                .catch((error) => {
                    console.error(error);
                    var logS = error.message.split(" ")
                    if (searchStr("ECONNREFUSED", logS) == 1) {
                        message.channel.send("server is not running!")
                    } else {
                        message.channel.send("ERROR:" + error.message)
                    }
                })
        } else {
            message.channel.send("You don't have permission")
        }
    }
}