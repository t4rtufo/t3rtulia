const services = require('../../services');

module.exports = getStats = async (guildID) => {
  const data = await services.getUsers();

  const users = data.filter((u) =>
    Object.keys(u.guilds).includes(guildID)
  );

  users.sort((a, b) => {
    if (a.guilds[guildID].timesUsed == b.guilds[guildID].timesUsed)
      return 0;
    return a.guilds[guildID].timesUsed > b.guilds[guildID].timesUsed
      ? -1
      : 1;
  });
  return users.map((u) => ({
    nickname: u.guilds[guildID].nickname,
    avatar: u.guilds[guildID].avatar,
    timesUsed: u.guilds[guildID].timesUsed
  }));
};
