import React, { useCallback, useEffect, useMemo, useState } from 'react';
import $ from 'jquery';
import { capitalizeFirstLetter, isNumber } from '../../utils/utils';
import IconButton from '../common/iconButton';
import TextInput from '../common/input/text';
import OptionInput from '../common/input/option';
import { columns } from './utils';
import useDeleteAnime from '../../hooks/anime/useDeleteAnime';
import AnimeModal from './modal/animeModal';

const Anime = ({ anime, index, uploadNewAnime, removeNewAnime, stateList }) => {
  const [showInfo, setShowInfo] = useState(false);
  const deleteAnime = useDeleteAnime();

  const getValue = column => {
    switch (column.path) {
      case 'index':
        return index;
      case 'state':
        return isNumber(anime.fakeId) ? (
          <OptionInput
            name={column.path}
            changeFunc={e => handleChange(e)}
            list={stateList}
            field="descrizione"
            selected={anime[column.path]?.id}
          />
        ) : (
          anime[column.path]?.descrizione
        );
      case 'buttons':
        return renderButtons;
      default:
        return isNumber(anime.fakeId) ? (
          <TextInput
            changeFunc={e => handleChange(e)}
            name={column.path}
            placeholder={capitalizeFirstLetter(column.path)}
            value={anime[column.path]}
          />
        ) : (
          anime[column.path]
        );
    }
  };

  const handleChange = useCallback(
    ({ currentTarget: input }) => {
      uploadNewAnime({ ...anime, [input.name]: input.value });
    },
    [anime, uploadNewAnime],
  );

  const renderButtons = useMemo(
    () => (
      <>
        {!isNumber(anime.fakeId) && (
          <IconButton
            func={() => setShowInfo(true)}
            title=""
            icon="info"
            customClass="btn-anime"
          />
        )}
        <IconButton
          func={() => {
            if (isNumber(anime.fakeId)) {
              removeNewAnime(anime);
            } else {
              deleteAnime.mutate(anime);
            }
          }}
          title="Delete Anime"
          icon="trash"
          customClass="btn-anime"
        />
        <div className="small text-danger">{anime.error}</div>
      </>
    ),
    [anime, deleteAnime, removeNewAnime],
  );

  useEffect(() => {
    const tooltip = $('[data-toggle="tooltip"]');
    tooltip.tooltip();
    return () => tooltip.tooltip('dispose');
  }, []);

  return (
    <>
      <tr className="overlay row" key={anime.id || anime.fakeId}>
        {columns().map(column => (
          <td
            key={(anime.id || anime.fakeId) + column.path}
            className={column?.customThClass || ''}
          >
            {getValue(column)}
          </td>
        ))}
      </tr>
      {showInfo && (
        <AnimeModal anime={anime} closeModal={() => setShowInfo(false)} />
      )}
    </>
  );
};

export default Anime;
