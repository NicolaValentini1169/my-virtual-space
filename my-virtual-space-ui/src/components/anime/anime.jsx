import React, { useEffect } from 'react';
import $ from 'jquery';
import { capitalizeFirstLetter, getFakeId, setError } from '../../utils/utils';
import animeApi from '../../api/animeApi';
import { checkAnime, saveAnime } from '../../utils/animeUtils';
import IconButton from '../common/iconButton';
import TextInput from '../common/input/text';
import OptionInput from '../common/input/option';

const Anime = ({
  anime,
  index,
  columns,
  uploadAnime,
  removeNewAnime,
  stateList,
  reloadAnimeList,
}) => {
  const getValue = column => {
    switch (column.path) {
      case 'index':
        return index;
      case 'state':
        return !anime.fakeId ? (
          anime[column.path]?.descrizione
        ) : (
          <OptionInput
            name={column.path}
            changeFunc={e => handleChange(e)}
            list={stateList}
            field="descrizione"
            selected={anime[column.path]?.id}
          />
        );
      case 'buttons':
        return renderButtons;
      default:
        return !anime.fakeId ? (
          anime[column.path]
        ) : (
          <TextInput
            changeFunc={e => handleChange(e)}
            name={column.path}
            placeholder={capitalizeFirstLetter(column.path)}
            value={anime[column.path]}
          />
        );
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    uploadAnime({ ...anime, [input.name]: input.value });
  };

  const renderButtons = !anime.fakeId ? (
    <>
      <IconButton
        func={() => uploadAnime({ ...anime, fakeId: getFakeId() })}
        title="Update Anime"
        icon="pencil"
        customClass="btn-anime"
      />
      <IconButton
        func={async () =>
          await animeApi
            .deleteAnimeById(anime.id)
            .then(response => response && reloadAnimeList())
        }
        title="Delete Anime"
        icon="trash"
        customClass="btn-anime"
      />
    </>
  ) : (
    <>
      <IconButton
        func={() => preSaveAnime()}
        title="Save Anime"
        icon="floppy-o"
        customClass="btn-anime"
      />
      <IconButton
        func={async () =>
          anime.id
            ? uploadAnime({ ...(await animeApi.findById(anime.id)) })
            : removeNewAnime(anime)
        }
        title={anime.id ? 'Reload Anime' : 'Delete Anime'}
        icon={anime.id ? 'times' : 'trash'}
        customClass="btn-anime"
      />
      <div className="small text-danger">{anime.error}</div>
    </>
  );

  const preSaveAnime = () => {
    const toSave = setError(anime, checkAnime(anime));

    if (toSave.error) {
      uploadAnime({ ...toSave });
    } else {
      saveAnime(toSave).then(response => {
        if (response) {
          reloadAnimeList();
          removeNewAnime(anime);
        }
      });
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
