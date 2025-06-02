import React from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SwiperSales } from '../constants';


export default function SliderSales() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {SwiperSales.map((item) => (
          <SwiperSlide  key={item.id}>
            <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-[300px] object-cover"
            />
          </SwiperSlide>
        ))}   
      </Swiper>
    </>
  )
}
