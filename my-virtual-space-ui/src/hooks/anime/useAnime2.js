import {
  deleteAnimeById,
  findAll,
  findById,
  saveAnime,
  updateAnime,
} from '../../api/animeApi';
import { toastError } from '../../utils/utils';
import { toast } from 'react-toastify';

export const useSaveAnime = async (anime, callback) => {
  return await saveAnime(anime)
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

export const useUpdateAnime = async (anime, callback) => {
  return await updateAnime(anime)
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

export const useDeleteAnime = async (id, callback) => {
  return await deleteAnimeById(id)
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

export const useAnimeList = async callback => {
  return await findAll()
    .then(({ data: list }) => {
      if (typeof callback === 'function') callback();
      return list;
    })
    .catch(({ response }) => {
      toastError(response?.status === 400 && response.data?.message);
      return [];
    });
};

export const useAnime = async (id, callback) => {
  return await findById(id)
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
