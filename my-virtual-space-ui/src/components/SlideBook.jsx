import React, {useEffect, useState} from 'react';

import 'swiper/swiper-bundle.css';
import imageApi from "../api/imageApi";

const SlideBook = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        getImages().then(data => setImages(data));
    }, [])

    const getImages = async () => {
        return await imageApi.findAll();
    }

    return (
        console.log("images", images) || images.length
            // ? <div className="masthead" style={{
            //     'background': `url('data:image/jpeg;base64,${images[3]}') no-repeat center center`
            // }}/>
            ? <img className='masthead' src={`data:image/jpeg;base64,${images[3]}`} alt='missing_image'/>
            : <div className="masthead"/>
    );
}

export default SlideBook;