"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import KcisaApi from "../../api/KcisaApi";
import { Coordinates } from "./types/store";
import { NaverMap } from "./types/map";
import { GiRotaryPhone } from "react-icons/gi";
import { AiOutlineEnvironment } from "react-icons/ai";
import shelter from "../../../shelter.json";

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
  searchQuery?: string;
  address?: string;
  orders?: string;
};

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

// 맵
export default function MapComponent({
  mapId = "map",
  initialCenter = { ...INITIAL_CENTER },
  initialZoom = 10,
}: Props) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const infoRaf = useRef<naver.maps.InfoWindow | null>(null);
  const markerRef = useRef<naver.maps.Marker[]>([]);
  const hasSetIdleListener = useRef(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // 모달
  const [modalData, setModalData] = useState<null | {
    type: "hospital" | "cafe" | "food" | "hotel" | "park" | "shelter";
    title: string;
    address?: string;
    region?: string;
    phone: string;
  }>(null);

  type PlaceType = "hospital" | "park" | "cafe" | "food" | "hotel";

  const markerIcons: Record<PlaceType, string> = {
    hospital: "/picture_images/map/animalhospital_marker.png",
    park: "/picture_images/map/park_marker.png",
    cafe: "/picture_images/map/cafe_marker.png",
    food: "/picture_images/map/food_marker.png",
    hotel: "/picture_images/map/hotel_marker.png",
  };
  // 탭 버튼
  const Tab = () => {
    const tabs = [{ id: 0, name: "" }];
  };
  // 마커 버튼
  const showMarkers = async (type: PlaceType, keyword: string) => {
    const map = mapRef.current;
    if (!map) return;

    if (!hasSetIdleListener.current) {
      window.naver.maps.Event.addListener(map, "idle", () => {
        showMarkers(type, keyword);
      });
      hasSetIdleListener.current = true;
    }

    const results = await KcisaApi(keyword);

    const bounds = map.getBounds() as naver.maps.LatLngBounds;
    const sw = bounds.getSW();
    const ne = bounds.getNE();

    const filtered = results.filter((item: any) => {
      const lat = parseFloat(item.lat);
      const lng = parseFloat(item.lng);
      return (
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat >= sw.lat() &&
        lat <= ne.lat() &&
        lng >= sw.lng() &&
        lng <= ne.lng()
      );
    });

    const newMarkers: naver.maps.Marker[] = [];

    // 마커생성
    filtered.forEach((item: any) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(item.lat, item.lng),
        map,
        title: item.title,
        icon: {
          url: markerIcons[type],
          scaledSize: new window.naver.maps.Size(50, 50),
          anchor: new window.naver.maps.Point(25, 25),
        },
      });

      window.naver.maps.Event.addListener(marker, "click", async () => {
        const latlng = new window.naver.maps.LatLng(item.lat, item.lng);
        const { address, cityName } = await searchCoordinateToAddress(
          latlng,
          item.title
        );
        setModalData({
          type,
          title: item.title,
          address: address,
          region: cityName,
          phone: item.tel,
        });
      });

      newMarkers.push(marker);
    });

    // 기존 마커를 새 마커가 렌더된 후 제거
    markerRef.current.forEach((marker) => marker.setMap(null));

    // 마커 업데이트
    markerRef.current = newMarkers;
  };

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

  // 클릭 핸들러
  const handleHospitalLocationClick = () => showMarkers("hospital", "동물병원");
  const handleParkLocationClick = () => showMarkers("park", "여행지");
  const handleCafeLocationClick = () => showMarkers("cafe", "카페");
  const handleHotelLocationClick = () => showMarkers("hotel", "펜션");
  const handleFoodLocationClick = () => showMarkers("food", "식당");

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
    <div style={{ display: "flex", width: "100%", height: "640px" }}>
      {sidebarVisible && (
        <div
          className="w3-sidebar w3-white w3-bar-block"
          style={{
            width: "25%",
            backgroundColor: "#f3f4f6",
            opacity: 0.95,
            padding: "1rem",
            position: "relative",
            height: "640px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 상단 메뉴 + 닫기 버튼 */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <a
                href="#"
                className="w3-bar-item w3-button m-1 py-2 px-4 bg-white rounded-2xl hover:bg-gray-200"
              >
                홈
              </a>
              <a
                href="#"
                className="w3-bar-item w3-button m-1 py-2 px-4 bg-white rounded-2xl hover:bg-gray-200"
              >
                정보
              </a>
            </div>
            <button
              className="w3-bar-item w3-button bg-blue-500 px-3 py-2 text-white rounded-2xl hover:bg-blue-600"
              onClick={() => setSidebarVisible(false)}
            >
              닫기
            </button>
          </div>

          {/* 이미지 */}
          <div className="flex justify-center mb-4">
            <img
              src="/picture_images/festivallist/festival1.jpg"
              alt="Festival"
              className="rounded w-full max-h-80 object-cover"
            />
          </div>

          {/* 모달 정보 */}
          {modalData && (
            <div className="bg-white rounded-2xl p-4">
              <p className="flex justify-center items-center text-xl font-bold mb-3">{modalData.title}</p>
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
          )}
        </div>
      )}

      {/* 지도 영역 */}
      <div
        id={mapId}
        style={{
          width: sidebarVisible ? "80%" : "100%",
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
          onClick={handleHotelLocationClick}
          style={{ position: "absolute", top: 10, left: "10%", zIndex: 999 }}
        >
          숙박
        </button>
        <button
          className="flex justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
          onClick={handleCafeLocationClick}
          style={{ position: "absolute", top: 10, left: "20%", zIndex: 999 }}
        >
          카페
        </button>
        <button
          className="flex justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
          onClick={handleFoodLocationClick}
          style={{ position: "absolute", top: 10, left: "30%", zIndex: 999 }}
        >
          음식
        </button>
        <button
          className="flex justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
          onClick={handleCurrentLocationClick}
          style={{ position: "absolute", top: 10, left: "40%", zIndex: 999 }}
        >
          현재 위치
        </button>
        <button
          className="flex justify-center items-cnter px-4 py-2 bg-white/60 rounded-2xl"
          onClick={handleParkLocationClick}
          style={{ position: "absolute", top: 10, left: "50%", zIndex: 999 }}
        >
          공원
        </button>
        <button
          className="felx justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
          onClick={handleShelterLocationClick}
          style={{ position: "absolute", top: 10, left: "60%", zIndex: 999 }}
        >
          보호소
        </button>
        <button
          className="flex justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
          onClick={handleHospitalLocationClick}
          style={{ position: "absolute", top: 10, left: "70%", zIndex: 999 }}
        >
          동물병원
        </button>
      </div>
    </div>
  );
}
