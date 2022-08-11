const { pingerexport } = require('./schemas/PINGEREXPORT.js')

const util = require('minecraft-server-util');

const delay = ms => new Promise(res => setTimeout(res, ms));

function searchStr (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

function pinglooper(bot){
    const options = {
        timeout: 1000 * 5, 
    };
    util.status('localhost', 25565, options)
        .then((result) => {
            console.log(result)
            bot.client.user.setActivity('the server (✔️)', { type: 'LISTENING' });
        })
        .catch((error) => {
            console.error(error);
            var logS = error.message.split(" ")
            if (searchStr("ECONNREFUSED", logS) == 1) {
                bot.client.user.setActivity('the server (❌)', { type: 'LISTENING' });
            } else {
                console.log("ERROR:" + error.message)
            }
        })
}

module.exports = {
    name: "pinger",
    category: "main",
    permissions: [],
    devOnly: false,
    run: async (bot) => {
        while (true) {
        await delay(5000);
        console.log("Waited 5s");
            pinglooper(bot)
        }
    }
}