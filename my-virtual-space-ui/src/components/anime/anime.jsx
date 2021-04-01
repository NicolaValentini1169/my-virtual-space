import React, { useEffect } from 'react';
import $ from 'jquery';
import { capitalizeFirstLetter } from '../../utils/utils';
import animeApi from '../../api/animeApi';
import { getFakeId, renderButtonAnime } from './animeUtils';

const Anime = ({
  anime,
  index,
  columns,
  uploadAnime,
  removeAnime,
  stateList,
  reloadAnimeList,
}) => {
  const getValue = column => {
    switch (column.path) {
      case 'index':
        return index;
      case 'state':
        return anime.fakeId
          ? renderState(column.path)
          : anime[column.path]?.descrizione;
      case 'add':
        return renderButtons;
      default:
        return anime.fakeId ? renderText(column.path) : anime[column.path];
    }
  };

  const renderText = name => (
    <input
      onChange={e => handleChange(e)}
      type="text"
      name={name}
      id={`input${capitalizeFirstLetter(name)}${index}`}
      className="form-control"
      placeholder={capitalizeFirstLetter(name)}
      required
      autoFocus
      value={anime[name]}
    />
  );

  const renderState = name => (
    <select
      className="custom-select"
      name={name}
      onChange={e => handleChange(e)}
    >
      {stateList?.map(state => (
        <option value={state.id} selected={anime[name]?.id === state.id}>
          {state.descrizione}
        </option>
      ))}
    </select>
  );

  const handleChange = ({ currentTarget: input }) => {
    uploadAnime({ ...anime, [input.name]: input.value });
  };

  const renderButtons = !anime.fakeId ? (
    <>
      {renderButtonAnime(
        'pencil',
        () => uploadAnime({ ...anime, fakeId: getFakeId() }),
        'Update Anime',
      )}
      {renderButtonAnime(
        'trash',
        async () =>
          (await animeApi.deleteAnimeById(anime.id)) && reloadAnimeList(),
        'Delete Anime',
      )}
    </>
  ) : (
    <>
      {renderButtonAnime('floppy-o', () => saveAnime(), 'Save Anime')}
      {renderButtonAnime(
        anime.id ? 'times' : 'trash',
        async () =>
          anime.id
            ? uploadAnime({ ...(await animeApi.findById(anime.id)) })
            : removeAnime(anime),
        anime.id ? 'Reload Anime' : 'Delete Anime',
      )}
    </>
  );

  const saveAnime = async () => {
    let response;
    if (anime.id) response = await animeApi.updateAnime(anime);
    else response = await animeApi.saveAnime(anime);

    if (response) {
      reloadAnimeList();
      removeAnime(anime);
    }
  };

  useEffect(() => {
    const tooltip = $('[data-toggle="tooltip"]');
    tooltip.tooltip();
    return () => tooltip.tooltip('dispose');
  }, []);

  return (
    <tr className="overlay row" key={anime.id || anime.fakeId}>
      {columns.map(column => (
        <td
          key={(anime.id || anime.fakeId) + column.path}
          className={column?.customThClass || ''}
        >
          {getValue(column)}
        </td>
      ))}
    </tr>
  );
};

export default Anime;
