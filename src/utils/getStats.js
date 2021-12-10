const fs = require('fs');
const path = require('path');

module.exports = getStats = (guildID) => {
  const config = fs
    .readdirSync(path.join(__dirname, '../output'))
    .filter((file) => file.endsWith('.json'));

  let stats = {};
  if (config.length == 0) {
    stats = {
      users: []
    };
  } else {
    stats = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../output/stats.json'))
    );
  }

  const users = stats.users.filter((u) =>
    Object.keys(u.guilds).includes(guildID)
  );

  users.sort((a, b) => {
    if (a.guilds[guildID] == b.guilds[guildID]) return 0;
    return a.guilds[guildID] > b.guilds[guildID] ? -1 : 1;
  });
  return users;
};
