module.exports = {
  name: 'interactionCreate',
  once: false,
  execute(interaction) {
    if (interaction.channel) {
      console.log(
        `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
      );
    }
  }
};
