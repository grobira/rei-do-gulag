const { myCallOfDuty } = require('../config');

const getRecentMatch = async (CSRFToken) => {
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
    headers: {
      Cookie: `XSRF-TOKEN=${CSRFToken}; new_SiteId=cod; comid=cod; pgacct=battle; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fSwicGMiOnsidiI6MCwidCI6e319fX0; ACT_SSO_COOKIE=NTgxMzcyMTg1MjU2MTAwMDQzOToxNTk0MTY0NzEwNzI0OjVlYzc3NGFiNGM5OGEyZDliZWIzMzgxODBmNTEwOTkw; ACT_SSO_COOKIE_EXPIRY=1594164710724; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.keaUbdYPNLZ9d734KU0_TbY_n73k1pp-JJMnpyA3afH-Kp05tXN5gg.5gV9ASUHNn_Zp-Iu.inHKbKCN9-AmzWBhsPE0L3pRMd1_NR1qD0W-soiO0VRCgELu9_CfLmpX03OlWg8GyZ_2P9Pg2doH8In0wrtbXxMxOiDGRiodgPIUcCc-I3R7LjsRnCNQDkdwrMxNUGnIXuEiwGSI4ex2QbnD78DsrvSK5AM2CaVRLxfmQOAvuzZEAlgovw9CQU5kIudSTHGDvElXqMIJTOoPPjo19hsEzr9Rtcnl0X2vv7pkw13yV9TASTnEG5SN8tzK5fwz1rA-ukXxz2Weworlg-BnnYphi4sx2fnVqQKhttkiZA8OLRFf9oX4RzzyJuuxGcjbEkDo8pvqJXn7DzhLmD90DDTbpZ9ddUhpsWfnlpYma8ziVXFNeLCsiOEDheGkK8fr9_K5hQypIZzfk-xZcxklMnAjXtVfJpM5ohSXKG3I27UVUrOvtERkEbc3nqxlDduGeiTuW16VlPo_.PztgSiNr3Z-GfrBORyX4kw; ACT_SSO_REMEMBER_ME=NTgxMzcyMTg1MjU2MTAwMDQzOTokMmEkMTAkUDZEc0ZmNzlwdVZWeEpZLjRRLlRHZUJnUTFWNFg5WWNBQi85L1ZNTFBuQnZZUG15V2ZZNm0; ACT_SSO_EVENT="LOGIN_SUCCESS:1592955110819"; API_CSRF_TOKEN=5269e1dc-f117-4190-b006-2ab2c8431a97`,
    },
  };

  try {
    const { data } = await myCallOfDuty(request);

    return data;
  } catch (error) {
    console.log('Failed to obtain recent matchs data');
    console.log(error.config);

    throw new Error('Failed to obtain recent matchs data');
  }
};

module.exports = { getRecentMatch };
