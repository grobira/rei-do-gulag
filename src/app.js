const { getCSRFToken, getAuthToken } = require('./service/authActivision');

const { getRecentMatch, getPlayerInfo } = require('./service/callOfDuty.api');

const run = async () => {
  const CSRFToken = await getCSRFToken();

  console.log('CSRF TOKEN -> ' + CSRFToken);

  await getAuthToken(CSRFToken);

  //const response = await getRecentMatch(CSRFToken);
  const response = await getPlayerInfo(CSRFToken);

  console.log('FINAL RESPONSE -> ' + JSON.stringify(response, null, 2));

  return response;
};

run();
