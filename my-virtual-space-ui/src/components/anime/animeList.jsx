import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import LoadingSpinner from '../common/loadingSpinner';
import TableHeader from '../common/tableHeader';
import animeApi from '../../api/animeApi';
import Anime from './anime';
import EmptyBody from '../common/emptyBody';
import stateApi from '../../api/stateApi';
import { useSelector } from 'react-redux';
import { addNewAnime, saveNewAnime } from './animeUtils';

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
      <button
        type="button"
        className="btn p-0 pr-1 border-0 shadow-none"
        onClick={() => setNewAnimeList(addNewAnime(newAnimeList))}
        data-toggle="tooltip"
        data-placement="bottom"
        title="Add a new Anime"
      >
        <span className="fa fa-plus" />
      </button>
      <button
        type="button"
        className="btn p-0 pl-1 pr-1 border-0 shadow-none"
        onClick={() => setNewAnimeList(saveNewAnime(newAnimeList))}
        data-toggle="tooltip"
        data-placement="bottom"
        title="Save all new Anime"
      >
        <span className="fa fa-floppy-o" />
      </button>
      <button
        type="button"
        className="btn p-0 pl-1 border-0 shadow-none"
        onClick={() => setNewAnimeList([])}
        data-toggle="tooltip"
        data-placement="bottom"
        title="Delete all new Anime"
      >
        <span className="fa fa-trash" />
      </button>
    </>
  );

  const columns = [
    { path: 'index', label: '#', unclickable: true, customThClass: 'col-md-1' },
    { path: 'titolo', label: 'Titolo', customThClass: 'col-md-4' },
    { path: 'commento', label: 'Commento', customThClass: 'col-md-2' },
    { path: 'nota', label: 'Note', customThClass: 'col-md-2' },
    { path: 'state', label: 'Stato', customThClass: 'col-md-2' },
    {
      path: 'add',
      label: renderButtons,
      unclickable: true,
      customThClass: 'col-md-1',
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    setAnimeList((await animeApi.findAll()) || []);
    setStateList((await stateApi.findAll()) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    const tooltip = $('[data-toggle="tooltip"]');
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
            {newAnimeList.map((anime, index) => (
              <Anime
                anime={anime}
                index={`New ${index + 1}`}
                columns={columns}
                uploadAnime={uploadAnime}
                removeAnime={removeNewAnime}
                stateList={stateList}
                reloadAnimeList={fetchData}
              />
            ))}
            {animeList.map((anime, index) => (
              <Anime
                anime={anime}
                index={index + 1}
                columns={columns}
                uploadAnime={uploadAnime}
                removeAnime={removeNewAnime}
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
