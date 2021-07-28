import { fixForeignKey, isAStringNotBlank } from './utils';
import { useSaveAnime, useUpdateAnime } from '../hooks/anime/useAnime2';

export const getNewAnime = (user, fakeId) => ({
  id: null,
  fakeId,
  titolo: '',
  commento: '',
  nota: '',
  state: null,
  user: {
    id: user?.id,
  },
  stagioni: [],
});

export const fixAnime = anime => {
  if (anime) {
    delete anime.fakeId;
    anime.state = fixForeignKey(anime.state);
    anime.user = fixForeignKey(anime.user);

    return anime;
  } else {
    return null;
  }
};

export const checkAnime = anime => {
  if (!anime) {
    return 'Anime not exist';
  } else if (!isAStringNotBlank(anime.titolo)) {
    return 'Invalid title';
  } else if (!isAStringNotBlank(anime.commento)) {
    return 'Invalid comment';
  } else if (!isAStringNotBlank(anime.nota)) {
    return 'Invalid nota';
  } else if (!isAStringNotBlank(anime.state) && !anime.state?.id) {
    return 'Invalid state';
  }
};
