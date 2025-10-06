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
  { id: 1, image: "/picture_images/festivallist/festival1.jpg", title: "1"},
  { id: 2, image: "/picture_images/festivallist/festival2.jpg", title: "2"},
  { id: 3, image: "/picture_images/festivallist/festival3.png", title: "3"},
  { id: 4, image: "/picture_images/festivallist/festival3.jpg", title: "4"},
  { id: 5, image: "/picture_images/festivallist/festival5.png", title: "5"},
]
const FestivalList = () => {
  return (
    <>
      <h1 className="text-3xl mt-10 p-10">🎉 이번달 축제 List</h1>
      <div className="mb-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView="auto"
          spaceBetween={0} // 기본 간격
          slidesPerGroup={2}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          loop={true}
        >

          {slideData.map((slide) => (
            <SwiperSlide key={slide.id} style={{ width: "1200px" }}>
              <div className="flex gap-[10px] justify-between">  
                {Array(2).fill(0).map((_, i) => (
                  <button key={i}
                    className="flex flex-col bg-black rounded-3xl opacity-90"
                    style={{
                      width: '600px',
                      height: '300px',
                      backgroundImage: `url(${slide.image})`,
                    }}
                  >
                    API title값 불러오기
                  </button>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default FestivalList;
