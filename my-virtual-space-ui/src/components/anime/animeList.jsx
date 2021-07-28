import React, { useCallback, useEffect, useMemo, useState } from 'react';
import $ from 'jquery';
import TableHeader from '../common/tableHeader';
import { useSelector } from 'react-redux';
import useAnimeList from '../../hooks/anime/useAnimeList';
import { columns } from './utils';
import LoadingSpinner from '../common/loadingSpinner';
import EmptyBody from '../common/emptyBody';
import Anime from './anime';
import useStateList from '../../hooks/state/useStateList';
import { setError } from '../../utils/utils';
import { checkAnime, getNewAnime, saveAnime } from '../../utils/animeUtils';
import IconButton from '../common/iconButton';

const AnimeList = () => {
  const user = useSelector(state => state?.user);
  const [newAnimeList, setNewAnimeList] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    column: 'titolo',
    order: 'asc',
  });

  const {
    data: animeListData,
    isLoading: isLoadingAnime,
    isSuccess: isSuccessAnime,
    isError: isErrorAnime,
    error: errorAnime,
  } = useAnimeList();
  const {
    data: stateListData,
    isLoading: isLoadingState,
    isSuccess: isSuccessState,
    isError: isErrorState,
    error: errorState,
  } = useStateList();

  const animeList = useMemo(
    () => (isSuccessAnime && animeListData ? animeListData : []),
    [animeListData, isSuccessAnime],
  );

  const stateList = useMemo(
    () => (isSuccessState && stateListData ? stateListData : []),
    [stateListData, isSuccessState],
  );

  const removeNewAnime = useCallback(
    anime =>
      setNewAnimeList([...newAnimeList.filter(a => a.fakeId !== anime.fakeId)]),
    [newAnimeList],
  );

  const preSaveAnime = useCallback(() => {
    const list = newAnimeList.map(anime => setError(anime, checkAnime(anime)));

    const listToSave = list.filter(anime => !anime.error);
    const listWithError = list.filter(anime => anime.error);

    // Da controllare il reload della pagina che non viene fatto correttamente
    listToSave.forEach(
      async anime =>
        await saveAnime(anime)
          .then(response => {
            if (response) {
              removeNewAnime(anime);
            } else {
              listWithError.push(anime);
            }
          })
          .catch(error => listWithError.push(setError(anime, error))),
    );

    setNewAnimeList(listWithError);
  }, [newAnimeList, removeNewAnime]);

  const renderAnimeList = useMemo(() => {
    if (isLoadingAnime || isLoadingState) {
      return <LoadingSpinner />;
    }

    if (!!animeList.length || !!newAnimeList.length) {
      return (
        <tbody>
          {newAnimeList.concat(animeList).map((anime, index) => (
            <Anime
              key={anime.id}
              anime={anime}
              index={
                anime.id ? index + 1 - newAnimeList.length : `New ${index + 1}`
              }
              uploadNewAnime={anime =>
                setNewAnimeList([
                  ...newAnimeList.map(a =>
                    a.fakeId === anime.fakeId ? anime : a,
                  ),
                ])
              }
              removeNewAnime={removeNewAnime}
              stateList={stateList}
            />
          ))}
        </tbody>
      );
    }

    if (isErrorAnime || isErrorState) {
      return <p style={{ color: 'red' }}>{`${errorAnime} ${errorState}`}</p>;
    }

    return (
      <EmptyBody label="Non sono presenti anime." lenght={columns.length} />
    );
  }, [
    animeList,
    errorAnime,
    errorState,
    isErrorAnime,
    isErrorState,
    isLoadingAnime,
    isLoadingState,
    newAnimeList,
    removeNewAnime,
    stateList,
  ]);

  const renderButtons = useMemo(
    () => (
      <>
        <IconButton
          func={() =>
            setNewAnimeList([
              ...newAnimeList,
              getNewAnime(user, newAnimeList.length),
            ])
          }
          title="Add a new Anime"
          icon="plus"
        />
        <IconButton
          func={preSaveAnime}
          title="Save all new Anime"
          icon="floppy-o"
        />
      </>
    ),
    [newAnimeList, preSaveAnime, user],
  );

  useEffect(() => {
    const tooltip = $('[data-toggle="tooltip"]');
    tooltip.tooltip();
    return () => tooltip.tooltip('dispose');
  }, []);

  return (
    <div className="table-wrapper">
      <table className="table">
        <TableHeader
          columns={columns(renderButtons)}
          sortColumn={sortColumn}
          onSort={setSortColumn}
        />
        {renderAnimeList}
      </table>
    </div>
  );
};

export default AnimeList;
