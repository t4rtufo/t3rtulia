const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

const wait = require('util').promisify(setTimeout);
const path = require('path');

const tts = require('../utils/tts');
const updateStats = require('../utils/updateStats');

const colors = [
  'WHITE',
  'AQUA',
  'GREEN',
  'BLUE',
  'YELLOW',
  'PURPLE',
  'LUMINOUS_VIVID_PINK',
  'FUCHSIA',
  'GOLD',
  'ORANGE',
  'RED'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ttm')
    .setDescription('Convierte texto a mp3')
    .addStringOption((option) =>
      option
        .setName('texto')
        .setDescription('Tu mensaje')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('acento')
        .setDescription('El acento de la voz que lee el mensaje')
        .setRequired(true)
        .addChoices([
          ['Español', 'es'],
          ['Inglés', 'en'],
          ['Italiano', 'it'],
          ['Portugués', 'pt'],
          ['Francés', 'fr']
        ])
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const text = interaction.options.getString('texto');
    const language = interaction.options.getString('acento');

    const guildID = interaction.guildId;
    const userID = interaction.member.user.id;
    const username = interaction.member.user.username;

    const nickname = interaction.member.displayName;
    const avatar = interaction.member.displayAvatarURL();

    const audio = await tts(text, language);
    await wait(1500);
    await updateStats({
      userID,
      username,
      nickname,
      avatar,
      guildID
    });
    const parsedText =
      text.length > 25
        ? `_"${text.substring(0, 25)}..."_`
        : `_"${text}"_`;

    const attachment = new MessageAttachment(
      path.join(__dirname, `../output/${audio}.mp3`)
    );

    const embed = new MessageEmbed()
      .setColor(colors[text.length % colors.length])
      .setTitle(parsedText)
      .setDescription(`-**${nickname}**`)
      .setAuthor(
        nickname,
        `https://flagcdn.com/w160/${
          language == 'en' ? 'gb' : language
        }.webp`
      ) //Idioma
      .setThumbnail(avatar); //Usuario;

    await interaction.editReply({
      embeds: [embed],
      files: [attachment]
    });
  }
};
