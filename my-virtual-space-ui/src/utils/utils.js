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

/**
 * Return true if string is a string
 * and there is at least one char
 * @param string as string
 * @returns {boolean|number}
 */
export const isAStringNotBlank = string =>
  typeof string === 'string' && string.replace(' ', '').length;

export const setError = (obj, msg) => {
  if (typeof msg === 'string') {
    obj.error = msg;
  } else delete obj.error;

  return obj;
};
