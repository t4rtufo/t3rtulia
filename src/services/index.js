const axiosInstance = require('./axios');

// Users
module.exports = {
  getUsers: async () => {
    const users = await axiosInstance.get('/users');
    return users.data;
  },

  postUser: async (user) => await axiosInstance.post('/users', user),

  patchUser: async (userID, guild) =>
    await axiosInstance.patch(`/users/${userID}`, guild),

  // Channels
  getChannels: async () => await axiosInstance.get('/channels'),

  getChannel: async (channelID) => {
    const channel = await axiosInstance.get(`/channels/${channelID}`);
    return channel.data;
  },

  postChannel: async (channel) =>
    await axiosInstance.post('/channels', channel),

  patchChannel: async (channelID) =>
    await axiosInstance.patch(`/channels/${channelID}`)
};
