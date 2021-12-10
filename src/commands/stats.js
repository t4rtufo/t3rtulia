const { SlashCommandBuilder } = require('@discordjs/builders');
const getStats = require('../utils/getStats');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Estadísticas de uso de este comando'),

  async execute(interaction) {
    const guildID = interaction.guildId;
    const users = getStats(guildID);

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
            name: `:first_place: ${users[0].username}`,
            value: `${users[0].guilds[guildID]} usos`
          }
        ]
      };
    }
    if (users.length > 1)
      results.fields.push({
        name: `:second_place: ${users[1].username}`,
        value: `${users[1].guilds[guildID]} usos`
      });

    if (users.length > 2)
      results.fields.push({
        name: `:third_place: ${users[2].username}`,
        value: `${users[2].guilds[guildID]} usos`
      });

    await interaction.reply({ embeds: [results] });
  }
};
