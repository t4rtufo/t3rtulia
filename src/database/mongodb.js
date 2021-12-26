const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI || 'mongodb://localhost/t3rtulia';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));

module.exports = mongoose;
