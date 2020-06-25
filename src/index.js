'use strict';
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
const commands = require('./commands/commands');
const PREFIX = '!';

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async (message) => {
  if (message.content.startsWith(PREFIX)) {
    const input = message.content.slice(PREFIX.length).split(' ');
    const command = input.shift();
    if (commands[command] != null) {
      try {
        message.channel.send(await commands[command].exec(input));
      } catch (e) {
        console.log(e.message);
        message.channel.send(await commands[command].help);
      }
    } else {
      console.log(`Ignoring unknown command`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
