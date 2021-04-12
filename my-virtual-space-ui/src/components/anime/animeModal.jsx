import React from 'react';
import './anime.css';
import IconButton from '../common/iconButton';

const AnimeModal = ({ anime, closeModal }) => {
  return (
    <div className="anime-modal-content">
      <div className="anime-modal-header">
        {anime.titolo} - ({anime.titolo} giapponese)
        <IconButton func={closeModal} title="" icon="close" />
      </div>
      <div className="anime-modal-body">Body with anime info and season</div>
    </div>
  );
};

export default AnimeModal;
