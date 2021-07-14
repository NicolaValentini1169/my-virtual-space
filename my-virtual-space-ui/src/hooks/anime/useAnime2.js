import {
  deleteAnimeById,
  findAll,
  findById,
  saveAnime,
  updateAnime,
} from '../../api/animeApi';
import { toastError } from '../../utils/utils';
import { toast } from 'react-toastify';

export const useSaveAnime = (anime, callback) => {
  return saveAnime(anime)
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

export const useUpdateAnime = (anime, callback) => {
  return updateAnime(anime)
    .then(({ data: anime }) => {
      toast.success(`Anime ${anime.titolo} aggiornato correttamente`);

      if (typeof callback === 'function') callback();
      return anime;
    })
    .catch(({ response }) => {
      toastError(response?.status === 400 && response.data?.message);
      return null;
    });
};

export const useDeleteAnime = (id, callback) => {
  return deleteAnimeById(id)
    .then(({ data: anime }) => {
      toast.success(`Anime ${anime.titolo} eliminato correttamente`);

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

export const useAnimeList = callback => {
  return findAll()
    .then(({ data: list }) => {
      if (typeof callback === 'function') callback();
      return list;
    })
    .catch(({ response }) => {
      toastError(response?.status === 400 && response.data?.message);
      return [];
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
