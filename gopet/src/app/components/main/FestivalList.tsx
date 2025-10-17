"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Slide {
  id: number;
  image: string;
  title: string;
}
const slideData: Slide[] = [
  { id: 1, image: "/picture_images/festivallist/festival1.jpg", title: "1" },
  { id: 2, image: "/picture_images/festivallist/festival2.jpg", title: "2" },
  { id: 3, image: "/picture_images/festivallist/festival3.png", title: "3" },
  { id: 4, image: "/picture_images/festivallist/festival3.jpg", title: "4" },
  { id: 5, image: "/picture_images/festivallist/festival5.png", title: "5" },
];
const FestivalList = () => {
  return (
    <>
      <h1 className="text-3xl mt-10 p-10">🎉 이번달 축제 List</h1>
      <div className="w-full flex justify-center items-center">
        <Swiper
          modules={[Pagination]}
          slidesPerView={2}
          spaceBetween={0}
          pagination={{ clickable: true }}
          loop={true}
          initialSlide={0}
          centeredSlides={false}
          style={{ width: "70%" }} // 넉넉하게 잡기
        >
          {slideData.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col bg-yellow-300 rounded-3xl w-[500px] h-[250px]"
              >
                <p className="text-black text-base p-4">API title값 불러오기</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};


export default FestivalList;
