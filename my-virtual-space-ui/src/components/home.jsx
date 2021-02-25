import React, {useEffect} from 'react';
import * as $ from 'jquery';
import Header from "./header";
import NavBar from "./common/navbar";

const Home = ({onLogout}) => {

    useEffect(() => {
        $('.nav-link').removeClass('active');
        $('#home').addClass('active');
    }, [])

    return (
        <>
            <Header onLogout={onLogout}/>
            <div className='home'>
                {/* Qua ci va l'images slider */}
                <header className='masthead'/>
                <NavBar/>
            </div>
            <div className='footer'>
                My virtual Space, Nicola Valentini, 02/2020
            </div>
        </>
    );
};

export default Home;
