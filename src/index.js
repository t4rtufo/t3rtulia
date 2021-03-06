const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({
  presence: {
    activities: [{ name: 'Pasión de gavilanes', type: 'WATCHING' }],
    status: 'idle'
  },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES
  ],
  partials: ['CHANNEL']
});

// Retrieving commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync(path.join(__dirname, 'commands'))
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'commands', file));
  client.commands.set(command.data.name, command);
}

// Retrieving events
const eventFiles = fs
  .readdirSync(path.join(__dirname, 'events'))
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(path.join(__dirname, 'events', file));

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Receiving commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  }
});

client.login(token);
