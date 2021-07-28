import { findById, saveAnime } from '../../api/animeApi';
import { toastError } from '../../utils/utils';
import { toast } from 'react-toastify';
import { fixAnime } from '../../utils/animeUtils';

export const useSaveAnime = (anime, callback) => {
  return saveAnime(fixAnime(anime))
    .then(({ data: anime }) => {
      toast.success(`Anime ${anime.titolo} creato correttamente`);

      if (typeof callback === 'function') callback();

      return anime;
    })
    .catch(({ response }) => {
      toastError(response?.status === 400 && response.data?.message);
      return null;
    });
};

export const useAnime = (id, callback) => {
  return findById(id)
    .then(({ data: anime }) => {
      if (typeof callback === 'function') callback();
      return anime;
    })
    .catch(({ response }) => {
      toastError(
        (response?.status === 400 || response?.status === 404) &&
          response.data?.message,
      );
      return null;
    });
};
