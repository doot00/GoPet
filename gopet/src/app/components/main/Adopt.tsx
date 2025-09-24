'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const Adopt = () => {
  return (
    <>
      <h1 className="text-3xl">🐶 유기견 입양</h1>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        slidesPerGroup={5}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <button
            className="flex flex-col w-[600px] h-[300px] m-5 p-10 bg-black rounded-3xl opacity-90"
            style={{
              backgroundImage: `url(${"/picture_images/festivallist/festival1.jpg"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="flex flex-col w-[600px] h-[300px] m-5 p-10 bg-black rounded-3xl opacity-90"
            style={{
              backgroundImage: `url(${"/picture_images/festivallist/festival2.jpg"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="flex flex-col w-[600px] h-[300px] m-5 p-10 bg-black rounded-3xl opacity-90"
            style={{
              backgroundImage: `url(${"/picture_images/festivallist/festival3.png"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="flex flex-col w-[600px] h-[300px] m-5 p-10 bg-black rounded-3xl opacity-90"
            style={{
              backgroundImage: `url(${"/picture_images/festivallist/festival4.jpg"})`,
            }}
          >
            API title값 불러오기
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className="flex flex-col w-[600px] h-[300px] m-5 p-10 bg-black rounded-3xl opacity-90"
            style={{
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
