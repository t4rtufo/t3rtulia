const { SlashCommandBuilder } = require('@discordjs/builders');
const getStats = require('../utils/api/getStats');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Estadísticas de uso de este comando'),

  async execute(interaction) {
    if (!interaction.channel) {
      return interaction.reply({
        content: 'Direct messages are not admitted',
        ephemeral: true
      });
    }
    const guildID = interaction.guildId;
    const users = await getStats(guildID);
    let results = {
      color: '#8EA46D',
      title: 'Estadísticas',
      description: 'Este bot no ha sido usado suficientes veces'
    };
    if (users.length > 0) {
      results = {
        color: '#8EA46D',
        title: 'Estadísticas',
        description: 'Top usuarios de este bot',
        thumbnail: { url: users[0].avatar },
        fields: [
          { name: '\u200B', value: '\u200B' },
          {
            name: `:first_place: ${users[0].nickname}`,
            value: `${users[0].timesUsed} usos`
          }
        ]
      };
    }
    if (users.length > 1)
      results.fields.push({
        name: `:second_place: ${users[1].nickname}`,
        value: `${users[1].timesUsed} usos`
      });

    if (users.length > 2)
      results.fields.push({
        name: `:third_place: ${users[2].nickname}`,
        value: `${users[2].timesUsed} usos`
      });

    await interaction.reply({ embeds: [results] });
  }
};
