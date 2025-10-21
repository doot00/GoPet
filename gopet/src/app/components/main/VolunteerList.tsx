"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { TiHeart } from "react-icons/ti";
import { GiRotaryPhone } from "react-icons/gi";
import { AiOutlineEnvironment } from "react-icons/ai";
import volunteerlist from "../../../volunteerwork.json";

interface VolunData {
  name: string;
  title: string;
  state: string;
  begindate: string;
  enddate: string;
}

const VolunteerList = () => {
  const [volunData, setVolunData] = useState<VolunData[]>([]);
  useEffect(() => {
    const volunData = volunteerlist.map((data: any) => ({
      name: data.RECRUT_INST_NM,
      title: data.SERVIC_TITLE,
      state: data.RECRUT_STATE_NM,
      begindate: data.SERVIC_BEGIN_DE,
      enddate: data.SERVIC_END_DE,
    }));
    setVolunData(volunData);
  }, []);

  return (
    <>
      <h1 className="text-3xl mt-10 p-10">💗 봉사활동 List</h1>
      <div className="flex justify-center items-center">
        <Swiper
          modules={[Pagination]}
          slidesPerView={3}
          spaceBetween={0}
          pagination={{ clickable: true }}
          loop={true}
          initialSlide={0}
          centeredSlides={true}
          slidesOffsetBefore={5}
          slidesOffsetAfter={5} 
          style={{ width: "90%" }}
        >
          {volunData.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-3xl" style={{ width: "450px", height: "250px", backgroundColor: "rgba(253, 224, 71, 0.5)"}}>
                <div className="ml-5 mr-5 text-xl">
                  <h2 className="flex justify-center text-black text-2xl p-4">{p.name}</h2>
                  <div className="flex">
                    <span className="text-2xl">
                      <TiHeart />
                    </span>
                    <span>{p.state}</span>
                  </div>
                  <div className="flex">
                      <span>장 소 : {p.title}</span>
                    </div>
                    <div className="flex">
                      <span>
                        봉사시작일자 :
                      </span>
                      <span>{p.begindate}</span>
                    </div>
                    <div className="flex">
                      <span>
                        종료일자 : 
                      </span>
                      <span>{p.enddate}</span>
                    </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};


export default VolunteerList;
