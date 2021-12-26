const { SlashCommandBuilder } = require('@discordjs/builders');
const updateChannel = require('../utils/api/updateChannel');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reactions')
    .setDescription(
      'Activa o desactiva las reacciones en este canal'
    ),

  async execute(interaction) {
    if (!interaction.channel) {
      return interaction.reply({
        content: 'Direct messages are not admitted',
        ephemeral: true
      });
    }
    const channelID = interaction.channelId;
    const channelName = interaction.channel.name;

    const isEnabled = await updateChannel({ channelID, channelName });
    isEnabled
      ? await interaction.reply({
          content:
            'Las reacciones en este canal han sido:**ACTIVADAS**'
        })
      : await interaction.reply({
          content:
            'Las reacciones en este canal han sido:**DESACTIVADAS**'
        });
  }
};
