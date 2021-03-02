import constants from '../constants.json';
import http from '../services/httpService';
import config from '../config.json';
import {toast} from 'react-toastify';
import {toastError} from '../utils/utils';

const getConf = () => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(constants.accessToken),
    },
});

const saveAnime = (anime, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiAnimeEndpoint}`);

    http
        .post(url.href, anime, conf)
        .then(({data: anime}) => {
            toast.success(`Anime ${anime.animename} creato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const updateAnime = (anime, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiAnimeEndpoint}`);

    http
        .put(url.href, anime, conf)
        .then(({data: anime}) => {
            toast.success(`Anime ${anime.animename} agiornato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const deleteAnimeById = (id, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiAnimeEndpoint}`);
    url.searchParams.append('id', id);

    http
        .delete(url.href, conf)
        .then(({data: anime}) => {
            toast.success(`Anime ${anime.animename} eliminato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

const findAll = () => {
    const conf = getConf();

    const url = new URL(`${config.apiAnimeEndpoint}/findAll`);

    return http
        .get(url.href, conf)
        .then(({data: animes}) => {
            return animes;
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const findById = (id) => {
    const conf = getConf();

    const url = new URL(`${config.apiAnimeEndpoint}/findById`);
    url.searchParams.append('id', id);

    return http
        .get(url.href, conf)
        .then(({data: anime}) => {
            return anime;
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

const animeApi = {
    saveAnime,
    updateAnime,
    deleteAnimeById,
    findAll,
    findById
};

export default animeApi;
