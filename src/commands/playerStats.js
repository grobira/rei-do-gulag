const { MessageEmbed } = require('discord.js');
const { api } = require('../config');

const callCodApi = async (name, tag, type) => {
  let result = await api.get(`/warzone/${name}${tag}/${type}`);
  if (result.data.error === true) {
    result = await api.get(`/warzone/${name}${tag}/uno`);
  }
  return result;
};

const playerStats = async (commandArgs) => {
  let [name, tag] = commandArgs;
  let type = 'battle';

  if (tag === '0' || tag == null) {
    type = 'uno';
    tag = '';
  } else {
    tag = `%2523${tag}`;
  }
  const result = await callCodApi(name, tag, type);
  let embed = new MessageEmbed();
  embed.setTitle(`${name}'s statistics`);
  embed.setColor('RED');
  embed.setDescription(`Displaying **${name}**'s Warzone statistics.`);
  embed.setThumbnail(
    'https://www.callofduty.com/cdn/app/icons/mw/ranks/mp/icon_rank_155.png'
  );
  //   embed.setThumbnail(
  //     'https://www.callofduty.com/content/dam/atvi/callofduty/global/global-nav/shield_icon_no_drop.png'
  //     );
  embed.addField('Lifetime', '\u200b', false);
  embed.addField(
    'Kills',
    result.data.lifetime.mode.br_all.properties.kills,
    true
  );
  embed.addField(
    'Deaths',
    result.data.lifetime.mode.br_all.properties.deaths,
    true
  );
  embed.addField(
    'KDA',
    result.data.lifetime.mode.br_all.properties.kdRatio.toFixed(2),
    true
  );
  embed.addField('Weekly', '\u200b', false);
  embed.addField(
    'Kills',
    result.data.weekly.mode.br_all.properties.kills,
    true
  );
  embed.addField(
    'Deaths',
    result.data.weekly.mode.br_all.properties.deaths,
    true
  );
  embed.addField(
    'KDA',
    result.data.weekly.mode.br_all.properties.kdRatio.toFixed(2),
    true
  );

  return embed;
};

module.exports = { playerStats };
