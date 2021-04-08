import { fixForeignKey, getFakeId, isAStringNotBlank } from '../../utils/utils';
import animeApi from '../../api/animeApi';

export const getNewAnime = user => ({
  id: null,
  fakeId: getFakeId(),
  titolo: '',
  commento: '',
  nota: '',
  state: null,
  user: {
    id: user?.id,
  },
  stagioni: [],
});

export const saveNewAnime = list => {
  return list.map(anime => {
    delete anime.fakeId;
    return anime;
  });
};

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

export const saveAnime = async anime => {
  return anime.id
    ? await animeApi.updateAnime(fixAnime(anime))
    : await animeApi.saveAnime(fixAnime(anime));
};
