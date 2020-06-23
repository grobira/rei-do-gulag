const { MessageEmbed } = require('discord.js');
const { api } = require('./config');

const helpMessage = (command, args, description) => {
  let embed = new MessageEmbed();
  embed.setTitle(`${command} Help`);
  embed.setColor('RED');
  embed.setDescription(`${description}`);
  embed.addField('Usage', `!command ${args}`, true);
  return embed;
};

const commandFactory = (command, args, description, exec) => {
  return {
    args,
    description,
    exec,
    help: helpMessage(command, args, description),
  };
};

const addPlayer = (commandArgs) => {
  const [name, tag, type] = commandArgs;

  return `New players added. With ${name}, ${tag}, ${type}`;
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
  const result = await api.get(`/warzone/${name}${tag}/${type}`);
  let embed = new MessageEmbed();
  embed.setTitle(`${name}'s statistics`);
  embed.setColor('RED');
  embed.setDescription(`Displaying **${name}**'s Warzone statistics.`);
  embed.setThumbnail(
    'https://www.callofduty.com/cdn/app/icons/mw/ranks/mp/icon_rank_155.png'
  );
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

const commands = {
  update: commandFactory(
    'update',
    '',
    'Update the Database',
    () => 'Updating database'
  ),
  stats: commandFactory(
    'stats',
    'name tag',
    'Get players stats',
    (commandArgs) => playerStats(commandArgs)
  ),
  rank: commandFactory(
    'rank',
    '',
    'Return the rank of the players',
    () => 'Fetching players ranks'
  ),
  addPlayer: commandFactory(
    'addPlayer',
    'name tag type',
    'Add new player to the list',
    (commandArgs) => addPlayer(commandArgs)
  ),
  commandList: commandFactory(
    'commandList',
    '',
    'Get the list of commands avaliable',
    () => Object.keys(commands)
  ),
};

module.exports = commands;
