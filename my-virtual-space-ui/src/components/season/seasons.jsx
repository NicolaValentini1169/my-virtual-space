import React from 'react';
import TableHeader from '../common/tableHeader';
import Season from '../season/season';
import EmptyBody from '../common/emptyBody';

const Seasons = ({ seasons = [] }) => {
  const columns = [
    {
      path: 'ordine',
      label: '#',
      unclickable: true,
      customThClass: 'col-md-1',
    },
    {
      path: 'titolo',
      label: 'Titolo',
      unclickable: true,
      customThClass: 'col-md-3',
    },
    {
      path: 'episodiVisti',
      label: 'Ep. Visti',
      unclickable: true,
      customThClass: 'col-md-1',
    },
    {
      path: 'episodi',
      label: 'Ep. Totali',
      unclickable: true,
      customThClass: 'col-md-1',
    },
    {
      path: 'voto',
      label: 'Voto',
      unclickable: true,
      customThClass: 'col-md-1',
    },
    {
      path: 'dataUscita',
      label: 'Premiere',
      unclickable: true,
      customThClass: 'col-md-1',
    },
    {
      path: 'commento',
      label: 'Commento',
      unclickable: true,
      customThClass: 'col-md-3',
    },
    {
      path: 'buttons',
      label: '',
      unclickable: true,
      customThClass: 'col-md-1',
    },
  ];

  return (
    <div className="table-wrapper">
      <table className="table">
        <TableHeader columns={columns} />
        {seasons.length ? (
          <tbody>
            {seasons.map(season => (
              <Season key={season} season={season} columns={columns} />
            ))}
          </tbody>
        ) : (
          <EmptyBody
            label="Non sono presenti stagioni."
            lenght={columns.length}
          />
        )}
      </table>
    </div>
  );
};

export default Seasons;
