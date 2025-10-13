'use client';

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import KcisaApi from "../../api/KcisaApi";
import { Coordinates } from "./types/store";
import { NaverMap } from "./types/map";
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from "../hooks/useMap";

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

export default function MapComponent({

  mapId = "map",
  initialCenter = { ...INITIAL_CENTER },
  initialZoom = 10,
}: Props) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker[]>([]);
  const [modalData, setModalData] = useState<null | {
    type: "hospital" | "shelter" | "cafe" | "food" | "hotel" | "park";
    title: string;
    address?: string;
    region?: string;
    city?: string;
    phone: string;
  }>(null);



  // 지도 로딩 후 실행
  const initializeMap = () => {
    const center = new window.naver.maps.LatLng(...INITIAL_CENTER);
    const mapOptions = {
      center,
      zoom: initialZoom,
    };
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    const idleListener = window.naver.maps.Event.addListener(map, "idle", () => {
      fetchHospitals(); // 지도가 멈추면 다시 불러오기
    });
    
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

    // 기존 마커를 제거
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
  };

  return (
    <>
      {/* Naver Maps Script */}
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />

      {/* 지도 표시 */}
      <div id={mapId} style={{ width: "100%", height: "500px" }} />
    </>
  );
}
