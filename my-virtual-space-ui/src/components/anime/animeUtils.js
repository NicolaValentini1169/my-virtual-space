import React from 'react';

export const getNewAnime = user => ({
  id: null,
  fakeId: getFakeId(),
  titolo: '',
  commento: '',
  nota: '',
  state: null,
  user: user?.id,
  stagioni: [],
});

export const addNewAnime = (list, user) => [...list, getNewAnime(user)];

export const getFakeId = () =>
  new Date().getTime() * Math.floor(Math.random() * 100) + 1;

export const saveNewAnime = list => {
  return list.map(anime => {
    delete anime.fakeId;
    return anime;
  });
};

export const renderButtonAnime = (icon, func, title) => (
  <button
    type="button"
    className="btn btn-anime p-0 pl-1 pr-1 border-0 shadow-none"
    onClick={() => func()}
    data-toggle="tooltip"
    data-placement="bottom"
    title={title}
    data-original-title={title}
  >
    <span className={`fa fa-${icon}`} />
  </button>
);
