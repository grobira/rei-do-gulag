const { profileApi } = require('../config');
var FormData = require('form-data');

const getCSRFToken = async () => {
  const request = {
    url: '/cod/login',
  };

  try {
    const { headers } = await profileApi(request);

    const cookies = headers['set-cookie'];
    let tokenCookie = cookies.find((cookie) => cookie.includes('XSRF'));

    tokenCookie = tokenCookie.split(';').shift();

    const [, token] = tokenCookie.split('=');

    return token;
  } catch (error) {
    console.log('FAILED TO GET CSRF TOKEN');
    console.log(error.message);
    console.log(error.config);

    throw new Error('FAILED TO GET CSRF TOKEN');
  }
};

const getAuthToken = async (CSRFToken) => {
  const data = new FormData();

  data.append('username', process.env.ACTIVION_USER);
  data.append('password', process.env.ACTIVION_PASSWORD);
  data.append('remember_me', 'true');
  data.append('_csrf', CSRFToken);

  const request = {
    url: 'do_login',
    method: 'post',
    headers: {
      Cookie: `XSRF-TOKEN=${CSRFToken}; XSRF-TOKEN=${CSRFToken}; new_SiteId=cod; comid=cod; pgacct=battle; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fSwicGMiOnsidiI6MCwidCI6e319fX0; ACT_SSO_COOKIE=NTgxMzcyMTg1MjU2MTAwMDQzOToxNTk0MjE5MDM5NjEzOmRmNzU1MTA5ODk0ODExZTM1MzFmMjZjNjRmZTUzYmUx; ACT_SSO_COOKIE_EXPIRY=1594219039613; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.iSrUHAgm8bkpI-tmyCoGLFw2AprNl94Qkjy_K6rxc-EDGORjmHJt1w.N6WxxWOhfQBbyDtB.MuLkog1VSRGRwrD1MznZgG4ewrsKv-TeoOe4KvZiGBS_KLIHc-9Waq8oHuZdU2rv4GJwsWDguItbabkBvOGnDRcxq04nUpztjgsHZGOxZjhwYBoNYS4imeyW-PpoKoYbjKN03gTqYXeqjy-GHQVA42ZM3BvrHW8ptBR__d_Y5abWoyZNwtI3WcEdLY6xmHIAJgFwTvg153DOKPGKIzJK31rLjQ0yY3v07U_X1NN7N7yMtmfst9G3c-upIJmbvlRzeIQdroGcVRrDGMdRZ5F4c0V1jFRQMl46TDeM7pVb2GWFOJ3LrsIkz0kZjLKsfvHumC37ha2P67GIj0fdDp_ZVzcqvCt_ouXRoNH0NLUJ1I3ndj2IBXZ7pAqhy4EfiUuBR0hMei6UJiRvweUDSjGSdu_yZo01JRKq7pa2rfxbsKq7fBvaqZVXkiuzwghGP79gl68mK1Ht.b0Y98v49j6uyLTHNIPy0Pw; ACT_SSO_REMEMBER_ME=NTgxMzcyMTg1MjU2MTAwMDQzOTokMmEkMTAkSWVMYnZucFZkUzlIMG9TMHVjUk1sdWxNdzlWQzhJYm01Y2RGdTkwa1VHTGIxWTlQM1BTWVc; ACT_SSO_EVENT="LOGIN_SUCCESS:1593009439836"`,
      ...data.getHeaders(),
    },
    params: {
      new_SiteId: 'cod',
    },
    data,
  };

  try {
    const { status } = await profileApi(request);

    return status;
  } catch (error) {
    console.log('FAILED TO GET AUTH TOKEN');
    console.log(error.message);
    console.log(error.config);

    throw new Error('FAILED TO GET AUTH TOKEN');
  }
};

let CSRFTokenValid = '';

const getCookies = async (expired = false) => {
  if (expired || CSRFTokenValid === '') {
    const CSRFToken = await getCSRFToken();

    await getAuthToken(CSRFToken);

    CSRFTokenValid = CSRFToken;
  }

  return `XSRF-TOKEN=${CSRFTokenValid}; new_SiteId=cod; comid=cod; pgacct=battle; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fSwicGMiOnsidiI6MCwidCI6e319fX0; ACT_SSO_COOKIE=NTgxMzcyMTg1MjU2MTAwMDQzOToxNTk0MTY0NzEwNzI0OjVlYzc3NGFiNGM5OGEyZDliZWIzMzgxODBmNTEwOTkw; ACT_SSO_COOKIE_EXPIRY=1594164710724; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.keaUbdYPNLZ9d734KU0_TbY_n73k1pp-JJMnpyA3afH-Kp05tXN5gg.5gV9ASUHNn_Zp-Iu.inHKbKCN9-AmzWBhsPE0L3pRMd1_NR1qD0W-soiO0VRCgELu9_CfLmpX03OlWg8GyZ_2P9Pg2doH8In0wrtbXxMxOiDGRiodgPIUcCc-I3R7LjsRnCNQDkdwrMxNUGnIXuEiwGSI4ex2QbnD78DsrvSK5AM2CaVRLxfmQOAvuzZEAlgovw9CQU5kIudSTHGDvElXqMIJTOoPPjo19hsEzr9Rtcnl0X2vv7pkw13yV9TASTnEG5SN8tzK5fwz1rA-ukXxz2Weworlg-BnnYphi4sx2fnVqQKhttkiZA8OLRFf9oX4RzzyJuuxGcjbEkDo8pvqJXn7DzhLmD90DDTbpZ9ddUhpsWfnlpYma8ziVXFNeLCsiOEDheGkK8fr9_K5hQypIZzfk-xZcxklMnAjXtVfJpM5ohSXKG3I27UVUrOvtERkEbc3nqxlDduGeiTuW16VlPo_.PztgSiNr3Z-GfrBORyX4kw; ACT_SSO_REMEMBER_ME=NTgxMzcyMTg1MjU2MTAwMDQzOTokMmEkMTAkUDZEc0ZmNzlwdVZWeEpZLjRRLlRHZUJnUTFWNFg5WWNBQi85L1ZNTFBuQnZZUG15V2ZZNm0; ACT_SSO_EVENT="LOGIN_SUCCESS:1592955110819"; API_CSRF_TOKEN=5269e1dc-f117-4190-b006-2ab2c8431a97`;
};

module.exports = { getCSRFToken, getAuthToken, getCookies };
