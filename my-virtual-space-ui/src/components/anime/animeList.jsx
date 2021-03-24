import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../common/loadingSpinner';
import TableHeader from '../common/tableHeader';
import animeApi from '../../api/animeApi';
import Anime from './anime';
import EmptyBody from '../common/emptyBody';

const AnimeList = () => {
  const [animeList, setAnimeList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    column: 'title',
    order: 'asc',
  });

  const columns = [
    { path: 'index', label: '#', unclickable: true, customThClass: 'col-md-1' },
    { path: 'titolo', label: 'Titolo', customThClass: 'col-md-5' },
    { path: 'commento', label: 'Commento', customThClass: 'col-md-3' },
    { path: 'nota', label: 'Note', customThClass: 'col-md-3' },
  ];

  const fetchData = async () => {
    setLoading(true);
    const list = await animeApi.findAll();
    setAnimeList(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="table-wrapper">
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={setSortColumn}
        />
        {animeList.length ? (
          <tbody>
            {animeList.map((anime, index) => {
              return <Anime anime={anime} index={index} columns={columns} />;
            })}
          </tbody>
        ) : (
          <EmptyBody label="Non sono presenti anime." lenght={columns.length} />
        )}
      </table>
    </div>
  );
};

export default AnimeList;
