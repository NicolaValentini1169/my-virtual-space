import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import LoadingSpinner from '../common/loadingSpinner';
import TableHeader from '../common/tableHeader';
import animeApi from '../../api/animeApi';
import Anime from './anime';
import EmptyBody from '../common/emptyBody';
import stateApi from '../../api/stateApi';
import { useSelector } from 'react-redux';
import { checkAnime, getNewAnime, saveAnime } from './animeUtils';
import IconButton from '../common/iconButton';
import { setError } from '../../utils/utils';

const AnimeList = () => {
  const user = useSelector(state => state?.user);
  const [animeList, setAnimeList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAnimeList, setNewAnimeList] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    column: 'title',
    order: 'asc',
  });

  const renderButtons = (
    <>
      <IconButton
        func={() => setNewAnimeList([...newAnimeList, getNewAnime(user)])}
        title="Add a new Anime"
        icon="plus"
      />
      <IconButton
        func={() => preSaveAnime()}
        title="Save all new Anime"
        icon="floppy-o"
      />
      <IconButton
        func={() => setNewAnimeList([])}
        title="Delete all new Anime"
        icon="trash"
      />
    </>
  );

  const columns = [
    { path: 'index', label: '#', unclickable: true, customThClass: 'col-md-1' },
    { path: 'titolo', label: 'Titolo', customThClass: 'col-md-4' },
    { path: 'commento', label: 'Commento', customThClass: 'col-md-2' },
    { path: 'nota', label: 'Note', customThClass: 'col-md-2' },
    { path: 'state', label: 'Stato', customThClass: 'col-md-2' },
    {
      path: 'buttons',
      label: renderButtons,
      unclickable: true,
      customThClass: 'col-md-1',
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    setAnimeList(await animeApi.findAll());
    setStateList(await stateApi.findAll());
    setLoading(false);
  };

  useEffect(() => {
    const tooltip = $('[data-toggle="tooltip"]');

    fetchData();

    tooltip.tooltip();
    return () => tooltip.tooltip('dispose');
  }, []);

  const uploadAnime = anime => {
    if (anime?.id)
      setAnimeList([...animeList.map(a => (a.id === anime.id ? anime : a))]);
    else if (anime?.fakeId)
      setNewAnimeList([
        ...newAnimeList.map(a => (a.fakeId === anime.fakeId ? anime : a)),
      ]);
  };

  const removeNewAnime = anime =>
    setNewAnimeList([...newAnimeList.filter(a => a.fakeId !== anime.fakeId)]);

  const preSaveAnime = () => {
    const list = newAnimeList.map(anime => setError(anime, checkAnime(anime)));

    const listToSave = list.filter(anime => !anime.error);
    const listWithError = list.filter(anime => anime.error);
    const listError = [];

    listToSave.forEach(anime =>
      saveAnime(anime).then(response => {
        if (response) {
          removeNewAnime(anime);
          fetchData();
        } else {
          listError.push(anime);
        }
      }),
    );

    setNewAnimeList(listWithError.concat(listError));
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={setSortColumn}
        />
        {loading ? (
          <LoadingSpinner />
        ) : animeList.length || newAnimeList.length ? (
          <tbody>
            {newAnimeList.concat(animeList).map((anime, index) => (
              <Anime
                anime={anime}
                index={
                  anime.id
                    ? index + 1 - newAnimeList.length
                    : `New ${index + 1}`
                }
                columns={columns}
                uploadAnime={uploadAnime}
                removeNewAnime={removeNewAnime}
                stateList={stateList}
                reloadAnimeList={fetchData}
              />
            ))}
          </tbody>
        ) : (
          <EmptyBody label="Non sono presenti anime." lenght={columns.length} />
        )}
      </table>
    </div>
  );
};

export default AnimeList;
