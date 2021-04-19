import React from 'react';
import './animeModal.css';
import IconButton from '../../common/iconButton';
import Box from '../../common/box/box';
import Seasons from '../../season/seasons';

const AnimeModal = ({ anime, closeModal }) => {
  return (
    <div className="anime-modal-content">
      <div className="anime-modal-header font-magneto">
        {anime.titolo} - ({anime.titolo} giapponese)
        <IconButton func={closeModal} title="" icon="close" />
      </div>
      <div className="anime-modal-body">
        Body with anime info and season
        <Box title="Info" content="Content" />
        <Box title="Seasons" content={<Seasons seasons={anime.stagioni} />} />
        <Box title="BOH" content="Content" />
      </div>
    </div>
  );
};

export default AnimeModal;
