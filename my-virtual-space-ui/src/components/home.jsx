import React from 'react';
import Header from "./header";
import NavBar from "./common/navbar";
import routes from '../routes.json';
import AnimeList from "./anime/animeList";
import {useSelector} from "react-redux";
import SlideBook from "./SlideBook";

const Home = ({onLogout}) => {
    const redirect = useSelector(state => state.redirect);

    const showContent = () => {
        switch (redirect) {
            case routes.urls.anime:
                return <AnimeList/>;
            case routes.urls.test1:
                return <h1>TEST 1</h1>;
            case routes.urls.test2:
                return <h1>TEST 2</h1>;
            case routes.urls.test3:
                return <h1>TEST 3</h1>;
            default:
                return getHomeContent;
        }
    };

    const getHomeContent = <div className="d-flex">
        <div style={{width: '66%', border: '1px solid red'}}/>
        <div style={{width: '34%', border: '1px solid blue'}}>
            <h5 className="font-magneto">Notifiche</h5>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>
            <div className="overlay ciccio">È usicta la nuova stagione per l'anime One Punch Man</div>

        </div>
    </div>;

    return (
        <>
            <Header onLogout={onLogout}/>
            <div className='home'>
                <SlideBook/>
                <NavBar/>
                {showContent()}
            </div>
            <div className='footer'>
                My virtual Space, Nicola Valentini, 02/2020
            </div>
        </>
    );
};

export default Home;
