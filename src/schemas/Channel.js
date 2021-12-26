const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  _id: { type: String },
  channelName: { type: String },
  reactions: { type: Boolean }
});

module.exports = mongoose.model('Channel', channelSchema);
