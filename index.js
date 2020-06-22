'use strict';
require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client();
const axios = require("axios");
const commands = require("./commands");
const PREFIX = '!';
;

const api = axios.create({
    baseURL: 'https://call-of-duty-modern-warfare.p.rapidapi.com',
    timeout: 10000,
    headers: {
    'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com',
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    "useQueryString": "true",
    }
  });


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async message => {
    if (message.content.startsWith(PREFIX)) {
        const input = message.content.slice(PREFIX.length).split(' ');
		const command = input.shift();
        if(commands[command] != null){
            console.log(input)
            message.channel.send(commands[command](input));
        }else{
            console.log(`Ignoring unknown command`)

        }
    }
});

client.login(process.env.DISCORD_TOKEN);