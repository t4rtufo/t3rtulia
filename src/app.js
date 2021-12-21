const express = require('express');

//const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

//Settings
const app = express();
app.set('port', process.env.PORT || 3100);
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
//app.use(morgan('dev'));

//Route
app.use('/', require('./routes/bot.routes'));

//Excecuting server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
