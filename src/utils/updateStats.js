const fs = require('fs');
const path = require('path');

// Add one more time to user's use

module.exports = update = async (user) => {
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

  const userIndex = stats.users.findIndex(
    (u) => u.userID == user.userID
  );

  if (userIndex == -1) {
    stats.users.push({
      userID: user.userID,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      guilds: { [user.guildID]: 1 }
    });
  } else {
    const currentUser = stats.users[userIndex];
    if (Object.keys(currentUser.guilds).includes(user.guildID)) {
      currentUser.guilds[user.guildID]++;
    } else {
      currentUser.guilds = {
        ...currentUser.guilds,
        [user.guildID]: 1
      };
    }
  }

  fs.writeFileSync(
    path.join(__dirname, '../output/stats.json'),
    JSON.stringify(stats)
  );
};
