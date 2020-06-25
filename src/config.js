const axios = require('axios');

const myCallOfDuty = axios.create({
  baseURL: 'https://my.callofduty.com',
  timeout: 25000,
});

const profileApi = axios.create({
  baseURL: 'https://profile.callofduty.com',
  timeout: 25000,
});

module.exports = { myCallOfDuty, profileApi };
