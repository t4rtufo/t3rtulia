const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: String },
  username: { type: String },
  guilds: Schema.Types.Mixed
});
userSchema.methods,
  (toJSON = function () {
    const result = this.toObject();
    delete result.guilds;
    return result;
  });
module.exports = mongoose.model('User', userSchema);
