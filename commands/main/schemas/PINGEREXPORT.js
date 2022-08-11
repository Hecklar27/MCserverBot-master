const util = require('minecraft-server-util');

function searchStr (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

async function pingerexport(bot){
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

module.exports.pingerexport = pingerexport; 