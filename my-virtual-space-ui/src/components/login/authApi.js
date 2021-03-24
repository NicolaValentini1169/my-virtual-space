import http from '../../services/httpService';
import config from '../../config.json';
import constants from '../../constants.json';

const getConf = () => {
  const headers = { 'Content-Type': 'application/json' };
  return { headers };
};

const signIn = credential => {
  return http
    .post(config.apiLoginEndpoint, credential, getConf())
    .then(({ data: jwt }) => {
      return jwt;
    })
    .catch(onrejected => {
      return onrejected;
    });
};

const signUp = credential => {
  return http
    .put(config.apiRegistrationEndpoint, credential, getConf())
    .then(({ data: jwt }) => {
      return jwt;
    })
    .catch(onrejected => {
      return onrejected;
    });
};

const checkToken = path => {
  if (localStorage.getItem(constants.accessToken)) {
    http
      .post(
        config.apiCheckTokenEndpoint,
        localStorage.getItem(constants.accessToken),
        getConf(),
      )
      .then(({ data: jwt }) => {
        return jwt;
      })
      .catch(error => {
        return null;
      });
  }
};

const exports = {
  signIn,
  signUp,
  checkToken,
};

export default exports;
