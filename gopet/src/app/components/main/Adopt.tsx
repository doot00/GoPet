'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";


// api값을 불러오기 


const Adopt = () => {
  return (
    <>
      <h1 className="text-3xl mt-10 p-10">🐶 유기견 입양</h1>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        slidesPerGroup={5}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="my-swiper"
      >
        <SwiperSlide>
          <button
            className="flex flex-col m-5 bg-black rounded-3xl opacity-90"
            style={{
              width: '350px',
              height: '400px',
              backgroundImage: `url(${"/picture_images/festivallist/festival1.jpg"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="flex flex-col m-5 bg-black rounded-3xl opacity-90"
            style={{
              width: '350px',
              height: '400px',
              backgroundImage: `url(${"/picture_images/festivallist/festival2.jpg"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="flex flex-col m-5 bg-black rounded-3xl opacity-90"
            style={{
              width: '400px',
              height: '400px',
              backgroundImage: `url(${"/picture_images/festivallist/festival3.png"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="flex flex-col m-5 bg-black rounded-3xl opacity-90"
            style={{
              width: '400px',
              height: '400px',
              backgroundImage: `url(${"/picture_images/festivallist/festival4.jpg"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="flex flex-col m-5 bg-black rounded-3xl opacity-90"
            style={{
              width: '400px',
              height: '400px',
              backgroundImage: `url(${"/picture_images/festivallist/festival5.png"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Adopt;
