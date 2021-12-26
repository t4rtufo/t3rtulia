const express = require('express');
const path = require('path');

const Router = express.Router();

//Schema
const Channel = require('../schemas/Channel');

//GET all channels
Router.get('/channels', async (req, res) => {
  try {
    const channels = await Channel.find();
    res.json(channels);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//GET specific channel
Router.get('/channels/:channelID', async (req, res) => {
  const channelID = req.params.channelID;

  try {
    const channel = await Channel.findById(channelID);
    res.json(channel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//POST new channel
Router.post('/channels', async (req, res) => {
  try {
    const channel = new Channel({
      _id: req.body._id,
      channelName: req.body.channelName,
      reactions: true
    });
    await channel.save();
    res.json({ status: 'channel created' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//PATCH specific channel
Router.patch('/channels/:channelID', async (req, res) => {
  const channelID = req.params.channelID;

  const channel = await Channel.findById(channelID);
  try {
    await Channel.findByIdAndUpdate(channelID, {
      reactions: !channel.reactions
    });
    res.json({ status: 'channel updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
