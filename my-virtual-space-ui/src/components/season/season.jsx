import React, { useState } from 'react';
import IconButton from '../common/iconButton';

const Season = ({ season, columns }) => {
  const [showInfo, setShowInfo] = useState(false);

  const renderButtons = !season.fakeId ? (
    <>
      <IconButton
        func={() => setShowInfo(true)}
        title=""
        icon="info"
        customClass="btn-season"
      />
      <IconButton
        func={() => {}}
        title="Update Season"
        icon="pencil"
        customClass="btn-season"
      />
      <IconButton
        func={() => {}}
        title="Delete Season"
        icon="trash"
        customClass="btn-season"
      />
    </>
  ) : (
    <>
      <IconButton
        func={() => {}}
        title="Save Season"
        icon="floppy-o"
        customClass="btn-season"
      />
      <IconButton
        func={() => {}}
        title={season.id ? 'Reload Season' : 'Delete Season'}
        icon={season.id ? 'times' : 'trash'}
        customClass="btn-season"
      />
      <div className="small text-danger">{season.error}</div>
    </>
  );

  return (
    <tr className="overlay row" key={season.id || season.fakeId}>
      {columns.map(column => (
        <td
          key={(season.id || season.fakeId) + column.path}
          className={`color-black ${column?.customThClass || ''}`}
        >
          {column.path === 'buttons' ? renderButtons : season[column.path]}
        </td>
      ))}
    </tr>
  );
};
export default Season;
