const {
  getCSRFToken,
  getAuthToken,
} = require('./service/profileCallOffDuty.api');

const { getRecentMatch } = require('./service/myCallOfDuty.api');

const run = async () => {
  const CSRFToken = await getCSRFToken();

  console.log('CSRF TOKEN -> ' + CSRFToken);

  await getAuthToken(CSRFToken);

  const response = await getRecentMatch(CSRFToken);

  console.log('FINAL RESPONSE -> ' + JSON.stringify(response, null, 2));

  return response;
};

run();
