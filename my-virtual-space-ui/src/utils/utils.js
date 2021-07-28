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

export const getFakeId = () =>
  new Date().getTime() * Math.floor(Math.random() * 100) + 1;

/**
 * If is an id set it ad uuid,
 * if not exist .id set null
 * otherwise set the initial obj
 * @param obj
 * @returns {{id}|null|{id}|*}
 */
export const fixForeignKey = obj =>
  isAStringNotBlank(obj) ? { id: obj } : !obj?.id ? null : obj;

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

export const isString = obj => typeof obj === 'string';

export const isNumber = obj => typeof obj === 'number';
