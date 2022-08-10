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
            var access = true
        } else {
            var access = false
        }
        if (args[0] == "start" && message.member.roles.cache.some(role => role.name === consolemaster)) {
            message.channel.send("attempting to start...")
            const options = {
                timeout: 1000 * 5, 
            };
            util.status('localhost', 25565, options)
                .then((result) => {
                    console.log(result)
                    message.channel.send("server is already running!")
                })
                .catch((error) => {
                    console.error(error);
                    var log = error.message
                    var logS = log.split(" ")
                    if (searchStr("ECONNREFUSED", logS) == 1) {
                        if (mcserver == null) {
                            message.channel.send("Server is off, starting")
                            mcserver = spawn(MC_SERVER_START_SCRIPT);
                            } else {
                                message.channel.send("Server is already running!")
                            }
                    } else {
                        message.channel.send("ERROR:" + error.message)
                    }
                })
        } else if (args[0] == "stop" && message.member.roles.cache.some(role => role.name === consolemaster)) {
            message.reply("asking to stop...")
        } else if (access == false) {
            message.channel.send("You don't have permission")
        } else if (access == true) {
            message.channel.send("type start or stop")
        }
    }
}