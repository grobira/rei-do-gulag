const axios = require('axios');

const api = axios.create({
  baseURL: 'https://call-of-duty-modern-warfare.p.rapidapi.com',
  timeout: 10000,
  headers: {
    'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    useQueryString: 'true',
  },
});

module.exports = { api };
