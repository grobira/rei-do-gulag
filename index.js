'use strict';
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
const commands = require('./commands');
const PREFIX = '!';
const axios = require('axios');
const qs = require('qs');

axios.defaults.withCredentials = true;

client.on('ready', () => {
  axios.get('https://profile.callofduty.com/cod/login').then((res) => {
    const cookies = res.headers['set-cookie'];
    let tokenCookie = cookies.filter((coo) => coo.includes('XSRF'));
    tokenCookie = tokenCookie[0].split(';').shift();

    const [, token] = tokenCookie.split('=');
    const body = {
      username: process.env.ACTIVION_USER,
      password: process.env.ACTIVION_PASSWORD,
      remember_me: true,
      _csrf: token,
    };
    const headers = {
      Cookie: `XSRF-TOKEN=${token}`,
      'content-type': 'application/x-www-form-urlencoded',
    };
    const options = {
      headers,
      data: qs.stringify(body),
      url: 'https://profile.callofduty.com/do_login?new_SiteId=cod',
      method: 'POST',
      withCredentials: true,
      timeout: 10000,
      connection: 'keep-alive',
    };
    console.log(options);

    axios(options)
      .then((result) => {
        const authCookies = result.headers;
        console.log(authCookies);
        const url =
          'https://my.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/gamer/grobira%231315/matches/wz/start/0/end/0/details';
        const match = {
          method: 'GET',
          url,
          headers: {
            Cookie: [...authCookies],
          },
        };
        //axios(match).then((e) => console.log(e.data));
      })
      .catch((e) => console.log('Error '));
  });
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
        console.log(e);
        message.channel.send(await commands[command].help);
      }
    } else {
      console.log(`Ignoring unknown command`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
