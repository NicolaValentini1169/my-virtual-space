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

const saveGenre = (genre, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiGenreEndpoint}`);

    http
        .post(url.href, genre, conf)
        .then(({data: genre}) => {
            toast.success(`Genere ${genre.genrename} creato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const updateGenre = (genre, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiGenreEndpoint}`);

    http
        .put(url.href, genre, conf)
        .then(({data: genre}) => {
            toast.success(`Genere ${genre.genrename} agiornato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const deleteGenreById = (id, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiGenreEndpoint}`);
    url.searchParams.append('id', id);

    http
        .delete(url.href, conf)
        .then(({data: genre}) => {
            toast.success(`Genere ${genre.genrename} eliminato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

const findAll = () => {
    const conf = getConf();

    const url = new URL(`${config.apiGenreEndpoint}/findAll`);

    return http
        .get(url.href, conf)
        .then(({data: genres}) => {
            return genres;
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const findById = (id) => {
    const conf = getConf();

    const url = new URL(`${config.apiGenreEndpoint}/findById`);
    url.searchParams.append('id', id);

    return http
        .get(url.href, conf)
        .then(({data: genre}) => {
            return genre;
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

export default {
    saveGenre,
    updateGenre,
    deleteGenreById,
    findAll,
    findById
};
