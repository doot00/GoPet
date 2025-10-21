"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import abandonani from "../../../abandonanimal.json";

interface SlideData {
  sigun: string;
  state: string; // 보호중
  begindate: number;
  enddate: number;
  color: string;
  age: string;
  kg: any;
  sex: string;
  spray: string;
  shelter: string;
  addressgi: string; // 지번주소
  address: string; // 도로명주소
  thnail: string; // 썸네일 이미지
  img: any;
  tel: string;
}

const Adopt = () => {
  const [adoptData, setAdoptData] = useState<SlideData[]>([]);

  useEffect(() => {
    const adoptData = (abandonani as any[]).filter((data) => data.STATE_NM === "보호중")
    .slice(0, 10)
    .map((data: any) => ({
      sigun: data.SIGUN_NM,
      state: data.STATE_NM, // 보호중
      begindate: data.PBLANC_BEGIN_DE,
      enddate: data.PBLANC_END_DE,
      color: data.COLOR_NM,
      age: data.AGE_INFO,
      kg: data.BDWGH_INFO,
      sex: data.SEX_NM,
      spray: data.NTRZN_YN,
      shelter: data.SLTR_NM,
      addressgi: data.REFINE_ROADNM_ADDR,
      address: data.REFINE_LOTNO_ADDR,
      img: data.IMAGE_COURS,
      thnail: data.THNAIL_IMAGE_COURS,
      tel: data.SLTR_TELNO,
    }));
    setAdoptData(adoptData);
  }, []);

  return (
    <div className="w-full relative overflow-visible mb-30">
      <h1 className="text-3xl mt-10 p-10">🐶 유기견 입양</h1>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        loop={true}
        spaceBetween={10}
        initialSlide={0}
        centeredSlides={true}
        slidesPerView={5}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false}}
        style={{ width: "100%" }}
      >
        {adoptData.map((data: any, index: any) => (
          <SwiperSlide key={index} className="overflow-hidden" style={{ width: "85%" }}>
            <div className="flex flex-col items-start rounded-3xl"
                style={{
                  backgroundColor: "#f3f4f6",
                  width: "280px",
                  height: "400px",
                  padding: "10px",
                }}
              >
                {/* 이미지 */}
                <div
                  className="self-center"
                  style={{
                    backgroundImage: `url(${data.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "200px",
                    height: "165px",
                    borderRadius: "10px",
                    marginRight: "10px"
                  }}
                />

                {/* 텍스트 */}
                <div className="flex flex-col items-start text-black text-base mt-3 space-y-1 mb-2">
                  <span>상태 : {data.state}</span>
                  <span>나이 : {data.age}</span>
                  <span>체중 : {data.kg}</span>
                  <span>중성화여부 : {data.spray}</span>
                  <span>보호소명 : {data.shelter}</span>
                  <span>공고시작일 : {data.begindate}</span>
                  <span>공고종료일 : {data.enddate}</span>
                </div>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Adopt;
