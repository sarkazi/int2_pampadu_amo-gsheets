const axios = require("axios");

const amoApiInstance = axios.create({
  baseURL: `https://${process.env.AMO_REFERER}/api/v4`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AMO_LONG_TIME_TOKEN}`,
  },
});

module.exports = amoApiInstance;
