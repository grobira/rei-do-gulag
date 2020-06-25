const { myCallOfDuty } = require('../config');
const { getCookies } = require('./authActivision');

const getHeaders = async () => {
  return {
    Cookie: await getCookies(),
  };
};

const getRecentMatch = async (isRetry = false) => {
  const paramsPath = {
    version: 'v2',
    game: 'mw',
    platform: 'steam',
    username: 'Luckstai',
    start: '0',
    end: '0',
  };

  const request = {
    url: `/api/papi-client/crm/cod/${paramsPath.version}/title/${paramsPath.game}/platform/${paramsPath.platform}/gamer/${paramsPath.username}/matches/mp/start/${paramsPath.start}/end/${paramsPath.end}/details`,
    headers: await getHeaders(),
  };

  try {
    const { data } = await myCallOfDuty(request);

    return data;
  } catch (error) {
    console.log('Failed to obtain recent matchs data');
    console.log(error.config);
    await getCookies(true);

    if (!isRetry) {
      return getPlayerInfo({ isRetry: true });
    } else {
      throw new Error('Failed to obtain recent matchs data');
    }
  }
};

const getPlayerInfo = async (player, isRetry = false) => {
  const { name, tag = '0', type = 'uno' } = player;
  let username = '';
  if (tag !== '0') {
    username = `${name}%23${tag}`;
  } else {
    username = name;
  }
  const paramsPath = {
    version: 'v1',
    game: 'mw',
    platform: type,
    username,
  };
  const request = {
    url: `/api/papi-client/stats/cod/${paramsPath.version}/title/${paramsPath.game}/platform/${paramsPath.platform}/gamer/${paramsPath.username}/profile/type/wz`,
    headers: await getHeaders(),
  };

  try {
    const { data } = await myCallOfDuty(request);
    console.log(data);
    return data;
  } catch (error) {
    console.log('Failed to obtain player info data');
    console.log(error.config);

    await getCookies(true);

    if (!isRetry) {
      return getPlayerInfo({ isRetry: true });
    } else {
      throw new Error('Failed to obtain player info data');
    }
  }
};

module.exports = { getRecentMatch, getPlayerInfo };
