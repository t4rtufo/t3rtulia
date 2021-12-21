const express = require('express');
const path = require('path');

const Router = express.Router();

Router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = Router;
