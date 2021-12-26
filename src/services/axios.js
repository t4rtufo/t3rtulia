const axios = require('axios');
require('dotenv').config();

const axiosInstance = axios.create({
  baseURL: `http://127.0.0.1:${process.env.PORT || 3000}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});
module.exports = axiosInstance;
