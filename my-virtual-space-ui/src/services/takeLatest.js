import http from './httpService';

export const createTakeLatest = () => {
  let cancelToken;

  return ({ method, url, config = {}, data }) => {
    if (cancelToken) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    cancelToken = http.CancelToken.source();

    const conf = { ...config, cancelToken: cancelToken.token };

    return data ? http[method](url, data, conf) : http[method](url, conf);
  };
};
