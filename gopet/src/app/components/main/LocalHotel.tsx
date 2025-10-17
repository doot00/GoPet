"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Slide {
  id: number;
  image: string;
  title: string;
}

const slideData: Slide[] = [
  { id: 1, image: "/picture_images/localhotel/seoul2.jpg", title: "서 울" },
  { id: 2, image: "/picture_images/localhotel/suwon.jpg", title: "경 기" },
  { id: 3, image: "/picture_images/localhotel/incheon.jpg", title: "인 천" },
  { id: 4, image: "/picture_images/localhotel/kangwondo2.webp", title: "강원도"},
  { id: 5, image: "/picture_images/localhotel/chung.jpg", title: "충청도" },
  { id: 6, image: "/picture_images/localhotel/jeonju2.png", title: "전 주" },
  { id: 7, image: "/picture_images/localhotel/keongju2.jpeg", title: "경 주" },
  { id: 8, image: "/picture_images/localhotel/pusan2.jpeg", title: "부 산" },
  { id: 9, image: "/picture_images/localhotel/jeju.jpg", title: "제 주" },
];


export default function SwiperCarousel() {

  return (
    <div className="w-full relative overflow-visible">
      <h1 className="text-3xl p-10">🏖️ 지역별 숙박</h1>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        loop={true}
        spaceBetween={0}
        initialSlide={0}
        centeredSlides={false}
        slidesPerView={7.5}
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        style={{ width: "90%"}}
      >
          {slideData.map((p, i) => (
            <SwiperSlide key={i} className="overflow-hidden" style={{ width: "90%" }}>
              <div className="flex justify-between">
                  <button
                    key={p.id}
                    className="flex flex-col items-center justify-center
                      bg-cover bg-center relative rounded-3xl opacity-90"
                    style={{
                      backgroundImage: `url(${p.image})`,
                      width: "220px",
                      height: "280px",
                    }}
                  >
                    <div className="absolute bg-opacity-30 rounded-3xl" />
                    <span className="relative z-10 pb-4 text-white text-5xl">
                      {p.title}
                    </span>
                  </button>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
