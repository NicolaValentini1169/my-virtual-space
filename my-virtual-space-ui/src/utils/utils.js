import constants from '../constants.json';
import { toast } from 'react-toastify';

export const toastError = message => {
  toast.error(message || constants.apiError.genericError);
};

export const capitalizeFirstLetter = string => {
  return typeof string === 'string'
    ? string[0].toUpperCase() + string.slice(1)
    : '';
};
