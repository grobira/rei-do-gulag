const { profileApi } = require('../config');
var FormData = require('form-data');

const getCSRFToken = async () => {
  const request = {
    url: '/cod/login',
  };

  try {
    const { headers } = await profileApi(request);

    const cookies = headers['set-cookie'];
    const tokenCookie = cookies.find((cookie) => cookie.includes('XSRF'));

    tokenCookie = tokenCookie[0].split(';').shift();

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

module.exports = { getCSRFToken, getAuthToken };