"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Slide {
  number: number;
  image: string;
  color: string;
  age: string;
  kg: string;
  sex: string;
  spray: string;
  state: string;
  shelter: string;
  tel: string;
  startday: string;
  endday: string;
}

const slideData: Slide[] = [
  {
    number: 1,
    image: "/picture_images/localhotel/seoul2.jpg",
    color: "흰",
    age: "2",
    kg: "4kg",
    sex: "암컷",
    spray: "y",
    state: "깔끔",
    shelter: "인천",
    tel: "330",
    startday: "1017",
    endday: "1020",
  },
  {
    number: 2,
    image: "/picture_images/localhotel/suwon.jpg",
    color: "흰",
    age: "2",
    kg: "4kg",
    sex: "암컷",
    spray: "y",
    state: "깔끔",
    shelter: "인천",
    tel: "330",
    startday: "1017",
    endday: "1020",
  },
  {
    number: 3,
    image: "/picture_images/localhotel/incheon.jpg",
    color: "흰",
    age: "2",
    kg: "4kg",
    sex: "암컷",
    spray: "y",
    state: "깔끔",
    shelter: "인천",
    tel: "330",
    startday: "1017",
    endday: "1020",
  },
  {
    number: 4,
    image: "/picture_images/localhotel/kangwondo2.webp",
    color: "흰",
    age: "2",
    kg: "4kg",
    sex: "암컷",
    spray: "y",
    state: "깔끔",
    shelter: "인천",
    tel: "330",
    startday: "1017",
    endday: "1020",
  },
  {
    number: 5,
    image: "/picture_images/localhotel/chung.jpg",
    color: "흰",
    age: "2",
    kg: "4kg",
    sex: "암컷",
    spray: "y",
    state: "깔끔",
    shelter: "인천",
    tel: "330",
    startday: "1017",
    endday: "1020",
  },
  {
    number: 6,
    image: "/picture_images/localhotel/jeonju2.png",
    color: "흰",
    age: "2",
    kg: "4kg",
    sex: "암컷",
    spray: "y",
    state: "깔끔",
    shelter: "인천",
    tel: "330",
    startday: "1017",
    endday: "1020",
  },
];

const Adopt = () => {
  return (
    <div className="w-full relative overflow-visible">
      <h1 className="text-3xl mt-10 p-10">🐶 유기견 입양</h1>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        loop={true}
        spaceBetween={0}
        initialSlide={0}
        centeredSlides={false}
        slidesPerView={5.5}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        style={{ width: "90%" }}
      >
        {slideData.map((p, i) => (
          <SwiperSlide
            key={i}
            className="overflow-hidden"
            style={{ width: "90%" }}
          >
            <div className="flex mb-10">
              <div
                key={p.number}
                className="flex flex-col items-start rounded-3xl"
                style={{
                  backgroundColor: "#f3f4f6",
                  width: "300px",
                  height: "400px",
                  padding: "10px",
                }}
              >
                {/* 이미지 */}
                <div
                  className="self-center"
                  style={{
                    backgroundImage: `url(${p.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "200px",
                    height: "200px",
                    borderRadius: "10px",
                    marginTop: "3px"
                  }}
                />

                {/* 텍스트 */}
                <div className="flex flex-col items-start text-black text-base mt-3 space-y-1 mb-2">
                  <span>공고고유번호 : {p.number}</span>
                  <span>나이 : {p.age}</span>
                  <span>체중 : {p.kg}</span>
                  <span>중성화여부 : {p.spray}</span>
                  <span>보호소명 : {p.shelter}</span>
                  <span>공고시작일 : {p.startday}</span>
                  <span>공고종료일 : {p.endday}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Adopt;
