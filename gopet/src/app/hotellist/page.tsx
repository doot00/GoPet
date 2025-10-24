"use client";
import { useEffect, useState } from "react";
import { GiPositionMarker } from "react-icons/gi";
import { AiOutlineEnvironment } from "react-icons/ai";
import { useToggleNav } from "../components/hooks/useToggleNav";
import KcisaApi from "../api/KcisaApi";
import Header from "../components/main/Header";

type RegionDataType = {
  [sido: string]: string[];
};

interface HotelDataType {
  address: string;
  tel: string;
  url: string;
  si: string;
}

const HotelList = () => {
  // 모달 지역 선택
  const { isNavOpen, toggleNav } = useToggleNav(false);
  const [selectSido, setSelectSido] = useState("");
  const regionData: RegionDataType = {
    서울특별시: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    경기도: [
      "가평군",
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "양평군",
      "여주시",
      "연천군",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
    ],
    인천광역시: [
      "중구",
      "동구",
      "미추홀구",
      "연수구",
      "남동구",
      "부평구",
      "계양구",
      "서구",
      "강화군",
      "옹진군",
    ],
    강원도: [
      "춘천시",
      "원주시",
      "강릉시",
      "동해시",
      "태백시",
      "속초시",
      "삼척시",
      "홍천군",
      "횡성군",
      "영월군",
      "평창군",
      "정선군",
      "철원군",
      "화천군",
      "양구군",
      "인제군",
      "고성군",
      "양양군",
    ],
    충청남도: [
      "청주시",
      "충주시",
      "제천시",
      "보은군",
      "옥천군",
      "영동군",
      "진천군",
      "괴산군",
      "음성군",
      "단양군",
      "증평군",
    ],
    전라북도: [
      "전주시",
      "군산시",
      "익산시",
      "정읍시",
      "남원시",
      "김제시",
      "완주군",
      "진안군",
      "무주군",
      "장수군",
      "임실군",
      "순창군",
      "고창군",
      "부안군",
    ],
    전라남도: [
      "목포시",
      "여수시",
      "순천시",
      "나주시",
      "광양시",
      "담양군",
      "곡성군",
      "구례군",
      "고흥군",
      "보성군",
      "화순군",
      "장흥군",
      "강진군",
      "해남군",
      "영암군",
      "무안군",
      "함평군",
      "영광군",
      "장성군",
      "완도군",
      "진도군",
      "신안군",
    ],
    경상북도: [
      "포항시",
      "경주시",
      "김천시",
      "안동시",
      "구미시",
      "영주시",
      "영천시",
      "상주시",
      "문경시",
      "경산시",
      "군위군",
      "의성군",
      "청송군",
      "영양군",
      "영덕군",
      "청도군",
      "고령군",
      "성주군",
      "칠곡군",
      "예천군",
      "봉화군",
      "울진군",
      "울릉군",
    ],
    경상남도: [
      "창원시",
      "진주시",
      "통영시",
      "사천시",
      "김해시",
      "밀양시",
      "거제시",
      "양산시",
      "의령군",
      "함안군",
      "창녕군",
      "고성군",
      "남해군",
      "하동군",
      "산청군",
      "함양군",
      "거창군",
      "합천군",
    ],
    제주특별자치도: ["제주시", "서귀포시"],
  };
    
  const [isModalOpen, setIsModalOpen] = useState(true);
  

  // 선택된 위치 저장
  const [selectedLocation, setSelectedLocation] = useState<{
    sido: string;
  }>({ sido: "" });

  const [hotelData, setHotelData] = useState<HotelDataType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await KcisaApi();
        const hotelData = results.filter((data: any) => data.category2 === "펜션")
        .map((data: any) => {
          return {
            title: data.title,
            si: data.si,
            address: data.address,
            tel: data.tel,
            url: data.url,
            address2: data.address2,
          };
        });
        setHotelData(hotelData);
      } catch (error) {
        console.log("API 호출 에러:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <div className="flex justify-center text-3xl p-10">
        <button
              onClick={() => setIsModalOpen(true)}
              data-modal-target="crud-modal"
              data-modal-toggle="crud-modal"
              className="flex mr-5 block text-white bg-blue-500 hover:bg-blue-600 px-2 py-2 focus:outline-none rounded-2xl"
              type="button"
            >
              <span className="flex text-xl mr-2">
                <GiPositionMarker className="mr-2 text-2xl" /> 지 역
              </span>
            </button>
        {selectedLocation.sido && (
          <div className="flex px-2 py-2 bg-[#f3f4f6] rounded-2xl">
            <h2 className="flex justify-center items-center ml-10 mr-10 text-xl">
              {selectedLocation.sido}
            </h2>
          </div>
        )}
      </div>
      <div
        className="flex flex-col items-center mb-4"
        style={{ height: "1000px", overflowY: "scroll" }}
      >
        {hotelData
          .filter((data) => data.si === selectedLocation.sido)
          .map((data: any, index: any) => (
            <div
              key={index}
              className="justify-center items-center rounded-2xl p-4 mt-10 mb-10 bg-[#f3f4f6]"
              style={{ width: "450px", height: "240px" }}
            >
              <p className="flex justify-center items-center text-xl font-bold m-3">
                {data.title}
              </p>
              <hr className="border-t border-gray-300 my-4" />
              <div className="flex">
                <span className="text-2xl">
                  <AiOutlineEnvironment />
                </span>
                <span className="ml-2 mb-2">{data.address}</span>
              </div>
              <div className="flex">
                <span className="ml-2 mb-2">Tel : {data.tel}</span>
              </div>
              <div className="flex">
                <span className="ml-2 mb-2">
                  웹사이트 : {data.url ? data.url : "정보가 없습니다."}
                </span>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
          <form className="fixed inset-0 z-1000 flex justify-center items-center bg-black/90">
            {/* 시/도 선택 */}
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center border-b pb-2 mb-5">
                <label className="block mb-1 text-sm font-medium">지역</label>
              </div>
              <select
                value={selectSido}
                onChange={(e) => {
                  const newSido = e.target.value;
                  setSelectSido(newSido);
                }}
                className="w-full border rounded px-3 py-2 mb-5"
              >
                <option value="">시/도 선택</option>
                {Object.keys(regionData).map((sido) => (
                  <option key={sido} value={sido}>
                    {sido}
                  </option>
                ))}
              </select>

              {/* 확인 버튼 */}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault(); // 폼 제출 방지
                  setSelectedLocation({
                    sido: selectSido,
                  });
                  setIsModalOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={!selectSido}
              >
                확인
              </button>
            </div>
          </form>
        )}
    </>
  );
};

export default HotelList;
