import React, { useEffect, useState } from 'react';
import imageApi from '../api/imageApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper';
import { useSelector } from 'react-redux';

SwiperCore.use([EffectCoverflow]);
SwiperCore.use([Autoplay]);

const SlideBook = () => {
  const [images, setImages] = useState([]);
  const user = useSelector(state => state?.user);

  useEffect(() => {
    (async () =>
      user?.id && (await imageApi.findByUserId(user.id)))().then(data =>
      setImages(data),
    );
  }, [user]);

  return (
    user && (
      <Swiper
        slidesPerView={1}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {!images?.length ? (
          <SwiperSlide className="masthead d-flex align-items-end">
            <p className="text-center w-100 color-black font-magneto body-font-size">
              Ci scusiamo per l'inconveniente ma non è riuscito il caricamento
              delle immagini.
            </p>
          </SwiperSlide>
        ) : (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="masthead"
                src={`data:image/jpeg;base64,${image}`}
                alt="missing_image"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    )
  );
};

/* 'background': `url('data:image/jpeg;base64,${images[3]}') no-repeat center center` */

export default SlideBook;
