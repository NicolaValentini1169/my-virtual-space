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

const saveUser = (user, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiUserEndpoint}`);

    http
        .post(url.href, user, conf)
        .then(({data: user}) => {
            toast.success(`Utente ${user.username} creato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const updateUser = (user, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiUserEndpoint}`);

    http
        .put(url.href, user, conf)
        .then(({data: user}) => {
            toast.success(`Utente ${user.username} agiornato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const deleteUserById = (id, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiUserEndpoint}`);
    url.searchParams.append('id', id);

    http
        .delete(url.href, conf)
        .then(({data: user}) => {
            toast.success(`Utente ${user.username} eliminato correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

const findAll = () => {
    const conf = getConf();

    const url = new URL(`${config.apiUserEndpoint}/findAll`);

    return http
        .get(url.href, conf)
        .then(({data: users}) => {
            return users;
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const findById = (id) => {
    const conf = getConf();

    const url = new URL(`${config.apiUserEndpoint}/findById`);
    url.searchParams.append('id', id);

    return http
        .get(url.href, conf)
        .then(({data: user}) => {
            return user;
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

export default {
    saveUser,
    updateUser,
    deleteUserById,
    findAll,
    findById
};
