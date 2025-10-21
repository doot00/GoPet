"use client";

import Script from "next/script";
import { Coordinates } from "../components/Map/types/store";
import { NaverMap } from "../components/Map/types/map";
import { INITIAL_CENTER } from "../components/Map/MapComponent";
import { GiRotaryPhone } from "react-icons/gi";
import { AiOutlineEnvironment } from "react-icons/ai";
import shelter from "../../shelter.json";
import { useEffect, useRef, useState } from "react";
import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import volunteerlist from "../../volunteerwork.json";
import { TiHeart } from "react-icons/ti";
import Footer from "../components/main/Footer";

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
  searchQuery?: string;
  address?: string;
  orders?: string;
};

interface VolunData {
  name: string;
  title: string;
  state: string;
  begindate: string;
  enddate: string;
}

interface ShelterData {
  name: string;
  address: string;
  phone: string;
}

export default function Shelter({ mapId = "map", initialZoom = 10 }: Props) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const infoRaf = useRef<naver.maps.InfoWindow | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { isNavOpen, toggleNav } = useToggleNav(false);
  const [modalData, setModalData] = useState<null | {
    type: "shelter";
    title: string;
    address?: string;
    region?: string;
    phone: string;
  }>(null);

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

  const [shelterData, setShelterData] = useState<ShelterData[]>([]);
  useEffect(() => {
    const shelterData = shelter.map((data: any) => ({
      name: data.name,
      address: data.address,
      phone: data.phone,
    }));
    setShelterData(shelterData);
  },[]);
  
  // 사이드바 탭
  const tabs = [
    {
      id: 0,
      name: "홈",
      content: (
        <>
          <div className="flex justify-center items-center mb-4">
            <div className="flex justify-center items-center mb-4">
              {modalData && (
                <>
                  <div
                    className="bg-white justify-center items-center rounded-2xl p-4 mt-10"
                    style={{ width: "480px", height: "160px" }}
                  >
                    <p className="flex justify-center items-center text-xl font-bold m-2">
                      {modalData.title}
                    </p>
                    <div className="flex">
                      <span className="text-2xl">
                        <AiOutlineEnvironment />
                      </span>
                      <span className="ml-2">{modalData.address}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl">
                        <GiRotaryPhone />
                      </span>
                      <span className="ml-2">{modalData.phone}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      id: 1,
      name: "전체리스트",
      content: (
        <>
          <div className="flex justify-center items-center mb-4">
            <div className="flex flex-col items-center mb-4 hide-scrollbar" style={{ height: '1000px', overflowY: 'scroll'}}>
              {shelterData.map((data: any, index:any) => (
                <div
                  key={index}
                  className="bg-white justify-center items-center rounded-2xl p-4 mt-10"
                  style={{ width: "480px", height: "200px" }}
                >
                  <p className="flex justify-center items-center text-xl font-bold m-2">
                    {data.name}
                  </p>
                  <div className="flex items-center">
                    <span className="text-2xl">
                      <AiOutlineEnvironment />
                    </span>
                    <span className="ml-2">{data.address}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-2">{data.phone}</span>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      id: 2,
      name: "봉사활동",
      content: (
        <>
          <div className="flex justify-center items-center mb-4">
            <div className="flex flex-col items-center mb-4 hide-scrollbar" style={{ height: '1000px', overflowY: 'scroll'}}>
              {volunData.map((data: any, index:any) => (
                <div
                  key={index}
                  className="bg-white justify-center items-center rounded-2xl p-4 mt-10"
                  style={{ width: "480px", height: "200px" }}
                >
                  <p className="flex justify-center items-center text-xl font-bold m-2">
                    {data.name}
                  </p>
                  <div className="flex">
                    <span className="text-2xl">
                      <TiHeart />
                    </span>
                    <span className="ml-2">{data.state}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl">
                      <AiOutlineEnvironment />
                    </span>
                    <span className="ml-2">{data.title}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      봉사시작일자 :
                    </span>
                    <span className="ml-2">{data.begindate}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      종료일자 : 
                    </span>
                    <span className="ml-2">{data.enddate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
  ];

  
  // 현재 위치 버튼
  const handleCurrentLocationClick = () => {
    if (!mapRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        new naver.maps.Marker({
          position: currentLocation,
          map: mapRef.current!,
          title: "현재 위치",
        });
        mapRef.current!.setCenter(currentLocation);
      });
    }
  };

  // 보호소 json파일 사용
  const handleShelterLocationClick = () => {
    const newMarkers = shelter.map((data) => {
      const marker = new window.naver.maps.Marker({
        position: new naver.maps.LatLng(Number(data.lat), Number(data.lng)),
        map: mapRef.current!,
        title: data.name,
        icon: {
          url: "/picture_images/map/shelter_marker.png",
          scaledSize: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(25, 25),
        },
      });
      // marker 클릭시 아니라 그냥 주소창을띄울 수 있도록
      naver.maps.Event.addListener(marker, "click", () => {
        const latlng = new naver.maps.LatLng(
          Number(data.lat),
          Number(data.lng)
        );
        searchCoordinateToAddress(latlng, data.name);
        setModalData({
          type: "shelter",
          title: data.name,
          region: data.region,
          address: data.address,
          phone: data.phone,
        });
      });
      return marker;
    });
  };

  

  // 지도 로딩 후 실행
  const initializeMap = () => {
    const center = new window.naver.maps.LatLng(...INITIAL_CENTER);
    const mapOptions = {
      center,
      zoom: initialZoom,
      scaleControl: false,
      logoControlOptions: {
        position: naver.maps.Position.RIGHT_TOP,
      },
      mapDataControl: false,
      zoomControl: false,
      mapTypeControl: false,
    };
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;
  };

  async function searchCoordinateToAddress(
    latlng: naver.maps.LatLng,
    title?: string
  ): Promise<{ address: string; cityName: string }> {
    return new Promise((resolve, reject) => {
      naver.maps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(","),
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            reject("주소 조회 실패");
            return;
          }
          const items = response?.v2?.results || [];
          if (items.length === 0) {
            resolve({ address: "주소 없음", cityName: "도시 정보 없음" });
            return;
          }
          const item = items[0];
          const cityName = item.region.area1.name;
          const address =
            item.region.area1.name +
            " " +
            item.region.area2.name +
            " " +
            item.region.area3.name +
            " " +
            item.region.area4.name +
            (item.land.number1 ? " " + item.land.number1 : "") +
            (item.land.number2 ? "-" + item.land.number2 : "") +
            (item.land.addition0?.value ? " " + item.land.addition0.value : "");
          const contentHtml = `
            <div style="position:relative;padding:10px;min-width:150px;min-height:80px;line-height:140%;font-size:12px;">
              <h1>${title || "정보없음"}</h1>
              <p>주소 : ${address}</p>
            </div>
          `;
          infoRaf.current?.setContent(contentHtml);
          infoRaf.current?.open(mapRef.current!, latlng);

          resolve({ address, cityName });
        }
      );
    });
  }

  // 스크립트 로드 후 실행
  const handleScriptLoad = () => {
    initializeMap();
  };

  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <div style={{ display: "flex", width: "100%", height: "1200px" }}>
        {sidebarVisible && (
          <div
            className="w3-sidebar w3-white w3-bar-block"
            style={{
              width: "30%",
              backgroundColor: "#f3f4f6",
              opacity: 0.95,
              padding: "1rem",
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ul className="flex justify-between items-center">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex space-x-2 w3-bar-item w3-button m-1 py-2 px-4 bg-white rounded-2xl hover:bg-gray-200 ${
                    activeTab === tab.id ? "active bg-gray-300" : ""
                  }`}
                >
                  {tab.name}
                </li>
              ))}
              <div>
                <button
                  className="relative justify-end w3-bar-item w3-button bg-blue-500 px-3 py-2 text-white rounded-2xl hover:bg-blue-600"
                  onClick={() => setSidebarVisible(false)}
                >
                  닫기
                </button>
              </div>
            </ul>
            {tabs
              .filter((tab) => activeTab === tab.id)
              .map((tab) => (
                <div key={tab.id}>{tab.content}</div>
              ))}
          </div>
        )}

        {/* 지도영역 */}
        <div
          id={mapId}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transition: "width 0.3s ease",
          }}
        >
          <Script
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
          />

          {/* 지도 마크 버튼 */}
          <button
            className="flex justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
            onClick={handleCurrentLocationClick}
            style={{ position: "absolute", top: 10, left: "50%", zIndex: 999 }}
          >
            현재 위치
          </button>
          <button
            className="felx justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
            onClick={handleShelterLocationClick}
            style={{ position: "absolute", top: 10, left: "40%", zIndex: 999 }}
          >
            보호소
          </button>
        </div>
      </div>
      <Footer/>
    </>
  );
}
