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

const saveSeason = (season, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiSeasonEndpoint}`);

    http
        .post(url.href, season, conf)
        .then(({data: season}) => {
            toast.success(`Stagione ${season.seasonname} creato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const updateSeason = (season, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiSeasonEndpoint}`);

    http
        .put(url.href, season, conf)
        .then(({data: season}) => {
            toast.success(`Stagione ${season.seasonname} agiornato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const deleteSeasonById = (id, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiSeasonEndpoint}`);
    url.searchParams.append('id', id);

    http
        .delete(url.href, conf)
        .then(({data: season}) => {
            toast.success(`Stagione ${season.seasonname} eliminato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

const findAll = () => {
    const conf = getConf();

    const url = new URL(`${config.apiSeasonEndpoint}/findAll`);

    return http
        .get(url.href, conf)
        .then(({data: seasons}) => {
            return seasons;
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const findById = (id) => {
    const conf = getConf();

    const url = new URL(`${config.apiSeasonEndpoint}/findById`);
    url.searchParams.append('id', id);

    return http
        .get(url.href, conf)
        .then(({data: season}) => {
            return season;
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

export default {
    saveSeason,
    updateSeason,
    deleteSeasonById,
    findAll,
    findById
};
