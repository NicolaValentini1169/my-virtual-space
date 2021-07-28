import http from '../services/httpService';
import config from '../config.json';

export const saveState = state => http.post(config.apiStateEndpoint, state);

export const updateState = state => http.put(config.apiStateEndpoint, state);

export const deleteStateById = id =>
  http.delete(`${config.apiStateEndpoint}/${id}`);

export const findAll = () => http.get(config.apiStateEndpoint);

export const findById = id => http.get(`${config.apiStateEndpoint}/${id}`);
