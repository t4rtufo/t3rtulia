const services = require('../../services');

module.exports = async ({ channelID, channelName }) => {
  const currentChannel = await services.getChannel(channelID);

  if (currentChannel) {
    services.patchChannel(channelID);
    return !currentChannel.reactions;
  } else {
    services.postChannel({
      _id: channelID,
      channelName: channelName
    });
    return true;
  }
};
