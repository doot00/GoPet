"use client";

import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";
import { Coordinates } from "./types/store";
import { NaverMap } from "./types/map";
import useMap, { INITIAL_CENTER, INITIAL_ZOOM} from "../hooks/useMap";
import shelter from "../../../shelter.json";
import KcisaApi from "../../api/KcisaApi";
import styles from "./Map.module.css";

declare global {
  interface Window {
    naver: any;
  }
}

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
  searchQuery?: string;
  address?: string;
  orders?: string;
};

const Map = ({
  mapId = "map",
  initialCenter = {...INITIAL_CENTER},
  initialZoom = 10,
}: Props) => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const infoRaf = useRef<naver.maps.InfoWindow | null>(null);
  const markerRef = useRef<naver.maps.Marker[]>([]);

  // 모달
  const [modalData, setModalData] = useState<null | {
    type: "hospital" | "shelter" | "cafe" | "food" | "hotel" | "park";
    title: string;
    address?: string;
    region?: string;
    city?: string;
    phone: string;
  }>(null);

  // marker 버튼
  const [showHotel, setShowHotel] = useState(false);
  const [hotelMarkers, setHotelMarkers] = useState<naver.maps.Marker[]>([]);

  const [showPark, setShowPark] = useState(false);
  const [parkMarkers, setParkMarkers] = useState<naver.maps.Marker[]>([]);

  const [showShelter, setShowShelter] = useState(false);
  const [shelterMarkers, setShelterMarkers] = useState<naver.maps.Marker[]>([]);

  const [showHospital, setShowHospital] = useState(false);
  const [hospitalMarkers, setHospitalMarkers] = useState<naver.maps.Marker[]>(
    []
  );

  const [showCafe, setShowCafe] = useState(false);
  const [cafeMarkers, setCafeMarkers] = useState<naver.maps.Marker[]>([]);

  const [showFood, setShowFood] = useState(false);
  const [foodMarkers, setFoodMarkers] = useState<naver.maps.Marker[]>([]);

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

  // 보호소 위치 버튼 예외 내부 json 호출
  const handleShelterLocationClick = () => {
    if (showShelter) {
      // 마커 제거
      shelterMarkers.forEach((marker) => marker.setMap(null));
      setShelterMarkers([]);
      setShowShelter(false);
      setModalData(null);
    } else {
      // 마커 생성
      const newMarkers = shelter.map((data) => {
        const marker = new window.naver.maps.Marker({
          position: new naver.maps.LatLng(Number(data.lat), Number(data.lng)),
          map: mapRef.current!,
          region: data.region,
          phone: data.phone,
          title: data.name,
          address: data.address,
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
      setShelterMarkers(newMarkers);
      setShowShelter(true);
    }
  };

  // 동물병원 위치 버튼
  const handleHospitalLocationClick = async () => {
    if (!mapRef.current) return;
    if (showHospital) {
      hospitalMarkers.forEach((marker) => marker.setMap(null));
      setHospitalMarkers([]);
      setShowHospital(false);
    } else {
      const hospitals = await KcisaApi("동물병원");
      const newMarkers = filtered.map((hospital: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(hospital.lat, hospital.lng),
          map: mapRef.current!,
          title: hospital.title,
          tel: hospital.phone,
          icon: {
            url: "/picture_images/map/animalhospital_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        } as any);

        naver.maps.Event.addListener(marker, "click", async () => {
          const latlng = new naver.maps.LatLng(hospital.lat, hospital.lng);
          const { address, cityName } = await searchCoordinateToAddress(
            latlng,
            hospital.title
          );
          setModalData({
            type: "hospital",
            title: hospital.title,
            region: cityName,
            address: address,
            phone: hospital.tel,
          });
        });
        return marker;
      });
      setHospitalMarkers(newMarkers);
      setShowHospital(true);
    }
  };

  // 카페 위치 버튼
  const handleCafeLocationClick = async () => {
    if (!mapRef.current) return;
    if (showCafe) {
      cafeMarkers.forEach((marker) => marker.setMap(null));
      setCafeMarkers([]);
    } else {
      const cafes = await KcisaApi("카페");
      const firstCafes = cafes.slice(0, 30);
      const newMarkers = firstCafes.map((cafe: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(cafe.lat, cafe.lng),
          map: mapRef.current!,
          title: cafe.title,
          tel: cafe.tel,
          icon: {
            url: "/picture_images/map/cafe_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        } as any);
        naver.maps.Event.addListener(marker, "click", async () => {
          const latlng = new naver.maps.LatLng(cafe.lat, cafe.lng);
          const { address, cityName } = await searchCoordinateToAddress(
            latlng,
            cafe.title
          );
          setModalData({
            type: "cafe",
            title: cafe.title,
            region: cityName,
            address: address,
            phone: cafe.tel,
          });
        });
        return marker;
      });
      setCafeMarkers(newMarkers);
      setShowCafe(true);
    }
  };

  // 숙박 위치 버튼
  const handleHotelLocationClick = async () => {
    if (!mapRef.current) return;
    if (showHotel) {
      hotelMarkers.forEach((marker) => marker.setMap(null));
      setHotelMarkers([]);
    } else {
      const hotels = await KcisaApi("펜션");

      const firstHotels = hotels.slice(0, 30);
      const newMarkers = firstHotels.map((hotel: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(hotel.lat, hotel.lng),
          map: mapRef.current!,
          title: hotel.title,
          tel: hotel.tel,
          icon: {
            url: "/picture_images/map/hotel_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        } as any);
        naver.maps.Event.addListener(marker, "click", async () => {
          const latlng = new naver.maps.LatLng(hotel.lat, hotel.lng);
          const { address, cityName } = await searchCoordinateToAddress(
            latlng,
            hotel.title
          );
          setModalData({
            type: "hotel",
            title: hotel.title,
            region: cityName,
            address: address,
            phone: hotel.tel,
          });
        });
        return marker;
      });
      setHotelMarkers(newMarkers);
      setShowHotel(true);
    }
  };

  // 음식 위치 버튼
  const handleFoodLocationClick = async () => {
    if (!mapRef.current) return;
    if (showFood) {
      foodMarkers.forEach((marker) => marker.setMap(null));
      setFoodMarkers([]);
    } else {
      const foods = await KcisaApi("식당");
      const firstFoods = foods.slice(0, 30);
      const newMarkers = firstFoods.map((food: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(food.lat, food.lng),
          map: mapRef.current!,
          title: food.title,
          city: food.city,
          tel: food.tel,
          icon: {
            url: "/picture_images/map/food_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        } as any);
        naver.maps.Event.addListener(marker, "click", async () => {
          const latlng = new naver.maps.LatLng(food.lat, food.lng);
          const { address, cityName } = await searchCoordinateToAddress(
            latlng,
            food.title
          );
          setModalData({
            type: "food",
            title: food.title,
            region: cityName,
            address: address,
            phone: food.tel,
          });
        });
        return marker;
      });
      setFoodMarkers(newMarkers);
      setShowFood(true);
    }
  };

  // 공원 위치 버튼
  const handleParkLocationClick = async () => {
    if (!mapRef.current) return;
    if (showPark) {
      parkMarkers.forEach((marker) => marker.setMap(null));
      setParkMarkers([]);
      setShowPark(false);
    } else {
      const parks = await KcisaApi("여행지");
      const firstParks = parks.slice(0, 30);

      const newMarkers = firstParks.map((park: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(park.lat, park.lng),
          map: mapRef.current!,
          title: park.title,
          city: park.city,
          tel: park.tel,
          icon: {
            url: "/picture_images/map/park_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        } as any);
        naver.maps.Event.addListener(marker, "click", async () => {
          const latlng = new naver.maps.LatLng(park.lat, park.lng);
          const { address, cityName } = await searchCoordinateToAddress(
            latlng,
            park.title
          );
          setModalData({
            type: "park",
            title: park.title,
            region: cityName,
            address: address,
            phone: park.tel,
          });
        });
        return marker;
      });
      setParkMarkers(newMarkers);
      setShowPark(true);
    }
  };

  // 좌표 -> 주소 변환 비동기적으로 호출
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

  // 지도 로딩 후 실행
  const initializeMap = () => {
    const mapId = "map";
    const center = new window.naver.maps.LatLng(...INITIAL_CENTER);
    const mapOptions = {
      center: center,
      zoom: INITIAL_ZOOM,
    };
    // 지도 Id, options
    const map = new window.naver.maps.Map(mapId, mapOptions);
    map.setCursor("pointer");
    mapRef.current = map;

    // 지도 이동시 마커 업데이트
    const idleListener = window.naver.maps.Event.addListener(
      map,
      "idle",
      () => {
        fetchHospitals(); // 지도가 멈추면 다시 불러오기
      }
    );

    return () => {
      window.naver.maps.Event.removeListener(idleListener);
    };
  };

  // 병원 정보 가져오기
  const fetchHospitals = async () => {
    const map = mapRef.current;
    if (!map) return;
    const hospitals = await KcisaApi("동물병원");

    const bounds = map.getBounds() as naver.maps.LatLngBounds;
    const sw = bounds.getSW();
    const ne = bounds.getNE();

    const minLat = sw.lat();
    const minLng = sw.lng();
    const maxLat = ne.lat();
    const maxLng = ne.lng();

    // 범위 내만 필터링 

    const filtered = hospitals.filter((hospital: any) => {
      const lat = parseFloat(hospital.lat);
      const lng = parseFloat(hospital.lng);

      return (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= minLat && lat <= maxLat &&
      lng >= minLng && lng <= maxLng
    );
    })

    // 기존 마커를 제거한다. 
    markerRef.current.forEach((marker) => marker.setMap(null));

    // 새로운 마커 생성 
    const markers = filtered.map((hospital: any) => {
      const marker = new window.naver.maps.Marker({
        position: new naver.maps.LatLng(hospital.lat, hospital.lng),
        map: mapRef.current,
        title: hospital.title,
        icon: {
          url: "/picture_images/map/animalhospital_marker.png",
          scaledSize: new window.naver.maps.Size(50, 50),
          anchor: new window.naver.maps.Point(25, 25),
        },
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        setModalData({
          type: "hospital",
          title: hospital.title,
          address: hospital.address,
          phone: hospital.tel,
        });
      });

      return marker;
    });

    markerRef.current = markers;

  };

  // 스크립트 로드 후 실행
  const handleScriptLoad = () => {
    initializeMap();
    fetchHospitals();
  }


  return (
      <>
          <Script
          strategy="afterInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
          onReady={handleScriptLoad}/>
        
        <div
            id={mapId}
            style={{
              width: "calc(100% - 10px)",
              height: "100%",
              position: "relative",
              marginLeft: "0px",
              marginRight: "10px",
            }}
          >
        
          <button
            className="flex justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
            onClick={handleCurrentLocationClick}
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 999,
            }}
          >
            현재 위치
          </button>
          <button
            className="flex justify-center items-center"
            onClick={handleShelterLocationClick}
            style={{ position: "absolute", top: 10, left: "10%", zIndex: 999 }}
          >
            보호소
          </button>
          <button
            className="flex justify-center items-cnter"
            onClick={handleHospitalLocationClick}
            style={{ position: "absolute", top: 10, left: "20%", zIndex: 999 }}
          >
            동물병원
          </button>
          <button
            className="flex justify-center items-cnter"
            onClick={handleCafeLocationClick}
            style={{ position: "absolute", top: 10, left: "30%", zIndex: 999 }}
          >
            카페
          </button>
          <button
            className="flex justify-center items-cnter"
            onClick={handleFoodLocationClick}
            style={{ position: "absolute", top: 10, left: "60%", zIndex: 999 }}
          >
            음식
          </button>
          <button
            className="flex justify-center items-cnter"
            onClick={handleHotelLocationClick}
            style={{ position: "absolute", top: 10, left: "70%", zIndex: 999 }}
          >
            숙박
          </button>
          <button
            className="flex justify-center items-cnter"
            onClick={handleParkLocationClick}
            style={{ position: "absolute", top: 10, left: "80%", zIndex: 999 }}
          >
            공원
          </button>
          {/* <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /> */}
        
          {modalData && (
            <div className={styles.modal}>
              <div className={styles.modal_content}>
                <p className="text-xl font-bold">{modalData.title}</p>
                <p>{modalData.region}</p>
                <p>{modalData.address}</p>
                <p>{modalData.phone}</p>
                <button className="m-5 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setModalData(null)}>
                  닫기</button>
              </div>
            </div>)}
        </div>
      </>
    )
};

export default Map;
