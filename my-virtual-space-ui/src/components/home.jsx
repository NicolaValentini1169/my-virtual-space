import React from 'react';

const Home = () => {
  const getHomeContent = () => (
    <div className="d-flex">
      <div style={{ width: '66%', border: '1px solid red' }} />
      <div style={{ width: '34%', border: '1px solid blue' }}>
        <h5 className="font-magneto">Notifiche</h5>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
        <div className="overlay ciccio">
          È usicta la nuova stagione per l'anime One Punch Man
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="home">{getHomeContent()}</div>
      <div className="footer">My virtual Space, Nicola Valentini, 02/2020</div>
    </>
  );
};

export default Home;
