"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { Coordinates } from "./types/store";
import { NaverMap } from "./types/map";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../hooks/useMap";
import selter from "../../../selter.json";
import KcisaApi from "../../api/KcisaApi";

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
};

// 버튼 컴포넌트 따로 리펙토링..... 벗 너무 구리다 프로젝트가 ㅠ 구리귈..구리구리..넘 구리해 샤하고 빵한걸로좀 하고싶다

const Map = ({
  mapId = "map",
  initialCenter: Coordinates,
  initialZoom: number,
}: Props) => {
  const mapRef = useRef<naver.maps.Map | null>(null);

  const [showHotel, setShowHotel] = useState(false);
  const [hotelMarkers, setHotelMarkers] = useState<naver.maps.Marker[]>([]);
  
  const [showPark, setShowPark] = useState(false);
  const [parkMarkers, setParkMarkers] = useState<naver.maps.Marker[]>([]);
  
  const [showSelter, setShowSelter] = useState(false);
  const [selterMarkers, setSelterMarkers] = useState<naver.maps.Marker[]>([]);
  

  const [showHospital, setShowHospital] = useState(false);
  const [hospitalMarkers, setHospitalMarkers] = useState<naver.maps.Marker[]>([]);

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

  // 보호소 위치 버튼
  const handleSelterLocationClick = () => {
    if (!mapRef.current) return;
    if (showSelter) {
      // 마커 제거
      selterMarkers.forEach((marker) => marker.setMap(null));
      setSelterMarkers([]);
      setShowSelter(false);
    } else {
      // 마커 생성
      const newMarkers = selter.map((data) => {
        return new window.naver.maps.Marker({
          position: new naver.maps.LatLng(Number(data.lat), Number(data.lng)),
          map: mapRef.current!,
          title: data.name,
          icon: {
            url: "/picture_images/map/selter_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
      });
      setSelterMarkers(newMarkers);
      setShowSelter(true);
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
      
      const firstHospitals = hospitals.slice(0, 30);
      const newMarkers = firstHospitals.map((hospital: any) => {  
        return new naver.maps.Marker({
          position: new naver.maps.LatLng(hospital.lat, hospital.lng),
          map: mapRef.current!,
          title: hospital.title,
          icon: {
            url: "/picture_images/map/animalhospital_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
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
        return new naver.maps.Marker({
          position: new naver.maps.LatLng(cafe.lat, cafe.lng),
          map: mapRef.current!,
          title: cafe.title,
          icon: {
            url: "/picture_images/map/cafe_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
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
        return new naver.maps.Marker({
          position: new naver.maps.LatLng(hotel.lat, hotel.lng),
          map: mapRef.current!,
          title: hotel.title,
          icon: {
            url: "/picture_images/map/hotel_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
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
        return new naver.maps.Marker({
          position: new naver.maps.LatLng(food.lat, food.lng),
          map: mapRef.current!,
          title: food.title,
          icon: {
            url: "/picture_images/map/food_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
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
    } else {
      const parks = await KcisaApi("여행지");  
      const firstParks = parks.slice(0, 30);
      const newMarkers = firstParks.map((park: any) => {  
        return new naver.maps.Marker({
          position: new naver.maps.LatLng(park.lat, park.lng),
          map: mapRef.current!,
          title: park.title,
          icon: {
            url: "/picture_images/map/park_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
      });
      setParkMarkers(newMarkers);
      setShowPark(true);
    }
  }
    


const initializeMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(...INITIAL_CENTER),
        zoom: INITIAL_ZOOM,
        minZoom: 6,
        scaleControl: false,
        mapDataControl: false,
        logoControlOptions: {
          position: naver.maps.Position.BOTTOM_RIGHT,
        },
      };
      const map = new window.naver.maps.Map(mapId, mapOptions);
      map.setCursor("pointer");
      mapRef.current = map;
      
      // InfoWindow
      const InfoWindow = new window.naver.maps.InfoWindow({
        content: "<div>안녕</div>",
        anchorSkew: true,
      });

      window.naver.maps.Event.addListener(map, "click", (e: any) => {
        InfoWindow.setContent(`<div>좌표: ${e.coord.x}, ${e.coord.y}</div>`);
        InfoWindow.open(map, e.coord);
      });
      KcisaApi();
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div
        id={mapId}
        style={{ width: "100%", height: "100%", position: "relative" }}
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
          onClick={handleSelterLocationClick}
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
      </div>
    </>
  );
};

export default Map;
