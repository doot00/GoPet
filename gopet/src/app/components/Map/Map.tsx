import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import type { Coordinates } from "./types/store";
import { NaverMap } from "./types/map";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../hooks/useMap";
import selter from "../../../selter.json";
import KcisaApi from "../../api/KcisaApi";

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = "map",
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

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
        return new naver.maps.Marker({
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

  // 음식 위치 버튼
  const handleFoodLocationClick = async () => {
    if (!mapRef.current) return;
    if (showFood) {
      foodMarkers.forEach((marker) => marker.setMap(null));
      setFoodMarkers([]);
    } else {
      const foods = await KcisaApi("식당");
      
      const firstFoods = foods.slice(0, 30);
      const newMarkers = firstFoods.map((cafe: any) => {  
        return new naver.maps.Marker({
          position: new naver.maps.LatLng(cafe.lat, cafe.lng),
          map: mapRef.current!,
          title: cafe.title,
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

  // 체험은 생각해보기 ^^



  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 6,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT,
      },
    };
    KcisaApi();

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

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
      </div>
    </>
  );
};

export default Map;
