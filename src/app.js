const express = require('express');

const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

//DB connection
require('./database/mongodb');

//Settings
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Route
app.use('/', require('./routes/bot.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/channel.routes'));

//Excecuting server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
