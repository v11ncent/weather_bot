//by vince1444
//https://github.com/vince1444
//just make a bot through discord and run this code through node app.js
//you need node.js for this to work

const Discord = require('discord.js');
const interface = require('./interface');
const client = new Discord.Client();
//need this for bot to run since asynchronous
client.on('ready', () => {
    console.log('Bot ready.');
});

client.on('message', message => {
    if (message.content === '!weather') {
        message.channel.send('Please insert a zip code: ***!weather zip_code***');
    }
    else if (message.content.includes('!weather')) {
        full_message = message.content;
        parsed_message = message.content.split(' ');
        zip_code = parsed_message[1];
        function send(weather, desc, temp) {
            message.channel.send(`|Weather: ${weather}\n|Description: ${desc}\n|Temperature: ${temp}\n`);
        }
        interface.get_weather(zip_code, send);
    }
});

//CHANGE THIS TOKEN TO YOUR BOT'S TOKEN UNDER >BOT TAB
client.login('');