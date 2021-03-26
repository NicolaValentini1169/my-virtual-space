import constants from '../constants.json';
import http from '../services/httpService';
import config from '../config.json';
import { toast } from 'react-toastify';
import { toastError } from '../utils/utils';

const getConf = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem(constants.accessToken),
  },
});

const saveState = (state, callback) => {
  const conf = getConf();

  const url = new URL(`${config.apiStateEndpoint}`);

  http
    .post(url.href, state, conf)
    .then(({ data: state }) => {
      toast.success(`Stato ${state.statename} creato correttamente`);

      if (typeof callback === 'function') callback();
    })
    .catch(({ response }) => {
      toastError(response?.status === 400 && response.data?.message);
    });
};

const updateState = (state, callback) => {
  const conf = getConf();

  const url = new URL(`${config.apiStateEndpoint}`);

  http
    .put(url.href, state, conf)
    .then(({ data: state }) => {
      toast.success(`Stato ${state.statename} agiornato correttamente`);

      if (typeof callback === 'function') callback();
    })
    .catch(({ response }) => {
      toastError(response?.status === 400 && response.data?.message);
    });
};

const deleteStateById = (id, callback) => {
  const conf = getConf();

  const url = new URL(`${config.apiStateEndpoint}`);
  url.searchParams.append('id', id);

  http
    .delete(url.href, conf)
    .then(({ data: state }) => {
      toast.success(`Stato ${state.statename} eliminato correttamente`);

      if (typeof callback === 'function') callback();
    })
    .catch(({ response }) => {
      toastError(
        (response?.status === 400 || response?.status === 404) &&
          response.data?.message,
      );
    });
};

const findAll = () => {
  const conf = getConf();

  const url = new URL(`${config.apiStateEndpoint}/findAll`);

  return http
    .get(url.href, conf)
    .then(({ data: states }) => {
      return states;
    })
    .catch(({ response }) => {
      toastError(response?.status === 400 && response.data?.message);
      return [];
    });
};

const findById = id => {
  const conf = getConf();

  const url = new URL(`${config.apiStateEndpoint}/findById`);
  url.searchParams.append('id', id);

  return http
    .get(url.href, conf)
    .then(({ data: state }) => {
      return state;
    })
    .catch(({ response }) => {
      toastError(
        (response?.status === 400 || response?.status === 404) &&
          response.data?.message,
      );
    });
};

const stateApi = {
  saveState,
  updateState,
  deleteStateById,
  findAll,
  findById,
};

export default stateApi;
