const { MessageEmbed } = require('discord.js');

const { playerStats } = require('./playerStats');

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
