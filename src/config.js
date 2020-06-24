const axios = require('axios');

const api = axios.create({
  baseURL:
    'https://my.callofduty.com/api/papi-client/stats/cod/v2/title/mw/platform/',
  //   baseURL: 'https://call-of-duty-modern-warfare.p.rapidapi.com',
  timeout: 10000,
  headers: {
    // 'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com',
    // 'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    useQueryString: 'true',
  },
});

const myCallOfDuty = axios.create({
  baseURL: 'https://my.callofduty.com',
  timeout: 25000,
});

const profileApi = axios.create({
  baseURL: 'https://profile.callofduty.com',
  timeout: 25000,
});

module.exports = { api, myCallOfDuty, profileApi };
