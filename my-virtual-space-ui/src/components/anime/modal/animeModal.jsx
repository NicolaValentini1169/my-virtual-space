import React, { useEffect, useMemo, useState } from 'react';
import './animeModal.css';
import IconButton from '../../common/iconButton';
import Box from '../../common/box/box';
import Seasons from '../../season/seasons';
import { columns } from './utils';
import useStateList from '../../../hooks/state/useStateList';
import LoadingSpinner from '../../common/loadingSpinner';
import CompactData from '../../common/CompactData';
import useUpdateAnime from '../../../hooks/anime/useUpdateAnime';

const AnimeModal = ({ anime, closeModal }) => {
  const [modified, setModified] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const updateAnime = useUpdateAnime();

  const {
    data: stateListData,
    isLoading: isLoadingState,
    isSuccess: isSuccessState,
    isError: isErrorState,
    error: errorState,
  } = useStateList();

  const stateList = useMemo(
    () => (isSuccessState && stateListData ? stateListData : []),
    [stateListData, isSuccessState],
  );

  const infoTitle = useMemo(
    () => (
      <>
        Info
        {isChanging ? (
          <>
            <IconButton
              func={() => {
                updateAnime.mutate(modified);
                setIsChanging(false);
              }}
              title="Save Changes"
              icon="save"
              customClass="btn-anime"
            />
            <IconButton
              func={() => {
                setModified(anime);
                setIsChanging(false);
              }}
              title="Delete Changes"
              icon="trash"
              customClass="btn-anime"
            />
          </>
        ) : (
          <IconButton
            func={() => setIsChanging(true)}
            title="Update Info"
            icon="pencil"
            customClass="btn-anime"
          />
        )}
      </>
    ),
    [anime, isChanging, modified, updateAnime],
  );

  const renderInfo = useMemo(() => {
    if (isLoadingState) {
      return <LoadingSpinner />;
    }

    if (modified) {
      return (
        <div
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          {columns.map(column => (
            <CompactData
              key={column.path}
              column={column}
              data={modified}
              setData={value => setModified(value)}
              stateList={stateList}
              isChanging={isChanging}
            />
          ))}
        </div>
      );
    }

    if (isErrorState) {
      return <p style={{ color: 'red' }}>{errorState}</p>;
    }

    return (
      <p style={{ color: 'red' }}>
        Errore durante il carimento delle informazioni dell'anime
      </p>
    );
  }, [
    errorState,
    isChanging,
    isErrorState,
    isLoadingState,
    modified,
    stateList,
  ]);

  useEffect(() => {
    setModified(anime);
  }, [anime]);

  return (
    <div className="anime-modal-content">
      <div className="anime-modal-header font-magneto">
        {anime.titolo} - ({anime.titolo} giapponese)
        <IconButton func={closeModal} title="" icon="close" />
      </div>
      <div className="anime-modal-body">
        <Box title={infoTitle} content={renderInfo} />
        <Box title="Seasons" content={<Seasons seasons={anime.stagioni} />} />
        <Box title="BOH" content="Content" />
      </div>
    </div>
  );
};
export default AnimeModal;
