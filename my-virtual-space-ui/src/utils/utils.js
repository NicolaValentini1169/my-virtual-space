import constants from '../constants.json';
import {toast} from 'react-toastify';

export const toastError = message => {
    toast.error(message || constants.genericAPIError);
};