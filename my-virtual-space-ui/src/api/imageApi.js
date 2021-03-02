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

const saveImage = (image, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiImageEndpoint}`);

    http
        .post(url.href, image, conf)
        .then(({data: image}) => {
            toast.success(`Immagine salvata correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const updateImage = (image, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiImageEndpoint}`);

    http
        .put(url.href, image, conf)
        .then(({data: image}) => {
            toast.success(`Immagine aggiornata correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const deleteImageById = (id, callback) => {
    const conf = getConf();

    const url = new URL(`${config.apiImageEndpoint}`);
    url.searchParams.append('id', id);

    http
        .delete(url.href, conf)
        .then(({data: image}) => {
            toast.success(`Immagine eliminata correttamente`);

            if (typeof callback === 'function') callback();
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

const findAll = () => {
    const conf = getConf();

    const url = new URL(`${config.apiImageEndpoint}/findAll`);

    return http
        .get(url.href, conf)
        .then(({data: images}) => {
            return images;
        })
        .catch(({response}) => {
            toastError(response?.status === 400 && response.data?.message);
        });
};

const findById = (id) => {
    const conf = getConf();

    const url = new URL(`${config.apiImageEndpoint}/findById`);
    url.searchParams.append('id', id);

    return http
        .get(url.href, conf)
        .then(({data: image}) => {
            return image;
        })
        .catch(({response}) => {
            toastError((response?.status === 400 || response?.status === 404) && response.data?.message);
        });
};

const imageApi = {
    saveImage,
    updateImage,
    deleteImageById,
    findAll,
    findById
};

export default imageApi;
