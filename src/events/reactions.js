const emojify = require('../utils/emojify');
const services = require('../services');
module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    const currentChannel = await services.getChannel(
      message.channelId
    );
    if (!currentChannel.reactions) return;

    const emojis = emojify(message.content);
    for (const emoji of emojis) {
      message.react(emoji);
    }
  }
};
