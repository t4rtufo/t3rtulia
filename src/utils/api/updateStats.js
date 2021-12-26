const services = require('../../services');
// Add one more time to user's use

module.exports = async (user) => {
  const users = await services.getUsers();
  const userIndex = users.findIndex((u) => u._id == user._id);
  if (userIndex === -1) {
    services.postUser({
      _id: user._id,
      username: user.username,
      guilds: {
        [user.guildID]: {
          nickname: user.nickname,
          avatar: user.avatar,
          timesUsed: 1
        }
      }
    });
  } else {
    services.patchUser(user._id, {
      [user.guildID]: {
        nickname: user.nickname,
        avatar: user.avatar
      }
    });
  }
};
