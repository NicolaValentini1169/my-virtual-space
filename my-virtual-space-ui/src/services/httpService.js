import axios from 'axios';
import Routes from '../routes';
import constants from '../constants.json';

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_JAVA,
});

const getBaseConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem(constants.accessToken),
  },
});

instance.interceptors.request.use(
  config => {
    const baseConfig = getBaseConfig();
    return {
      ...baseConfig,
      ...config,
      headers: { ...baseConfig.headers, ...config.headers },
    };
  },
  error => error,
);

instance.interceptors.response.use(
  response => response,
  error => {
    const redirectToLogin =
      error.response?.status === 401 &&
      window.location.pathname !== Routes.urls.login;

    if (redirectToLogin) {
      window.location.href = Routes.urls.login;
      return;
    }

    const redirectToHome =
      error.response?.status === 403 &&
      window.location.pathname !== Routes.urls.home;

    if (redirectToHome) {
      window.location.href = Routes.urls.home;
      return;
    }

    // eslint-disable-next-line consistent-return
    return Promise.reject(error);
  },
);

export default instance;
