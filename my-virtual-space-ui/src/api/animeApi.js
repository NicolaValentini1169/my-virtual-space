import http from '../services/httpService';
import config from '../config.json';

export const saveAnime = anime => http.post(config.apiAnimeEndpoint, anime);

export const updateAnime = anime => http.put(config.apiAnimeEndpoint, anime);

export const deleteAnimeById = id =>
  http.delete(`${config.apiAnimeEndpoint}/${id}`);

export const findAll = () => http.get(config.apiAnimeEndpoint);

export const findById = id => http.get(`${config.apiAnimeEndpoint}/${id}`);
