const express = require('express');
const ObjectID = require('mongoose').Types.ObjectId;

const Router = express.Router();

//Schema
const User = require('../schemas/User');

//GET all users
Router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//POST new user
Router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ status: 'user created' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//PATCH specific user
Router.patch('/users/:userID', async (req, res) => {
  const userID = req.params.userID;

  const guild = req.body;
  const guildID = Object.keys(guild)[0];
  const user = await User.findById(userID);
  try {
    if (Object.keys(user.guilds).includes(guildID)) {
      await User.findByIdAndUpdate(userID, {
        guilds: {
          ...user.guilds,
          [guildID]: {
            ...user.guilds[guildID],
            nickname: guild[guildID].nickname,
            avatar: guild[guildID].avatar,
            timesUsed: user.guilds[guildID].timesUsed + 1
          }
        }
      });
    } else {
      await User.findByIdAndUpdate(userID, {
        guilds: {
          ...user.guilds,
          [guildID]: {
            ...guild[guildID],
            nickname: guild[guildID].nickname,
            avatar: guild[guildID].avatar,
            timesUsed: 1
          }
        }
      });
    }
    res.json({ status: 'user updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
