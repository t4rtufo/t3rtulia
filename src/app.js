const express = require('express');

const morgan = require('morgan');
const path = require('path');

//Settings
const app = express();
app.set('port', process.env.port || 80);

//Middlewares
app.use(morgan('dev'));

app.use((req, res, next) => {
	res.sendFile(path.join(__dirname,'view', 'index.html'));
});

//Excecuting server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});
