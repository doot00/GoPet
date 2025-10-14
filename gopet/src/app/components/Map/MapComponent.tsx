"use client";

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
  const infoRaf = useRef<naver.maps.InfoWindow | null>(null);
  const markerRef = useRef<naver.maps.Marker[]>([]);
  const hasSetIdleListener = useRef(false);

  const [modalData, setModalData] = useState<null | {
    type: "hospital" | "shelter" | "cafe" | "food" | "hotel" | "park";
    title: string;
    address?: string;
    region?: string;
    city?: string;
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

    window.naver.maps.Event.addListener(marker, "click", () => {
      setModalData({
        type,
        title: item.title,
        address: item.address,
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


  // 클릭 핸들러
  const handleHospitalLocationClick = () => showMarkers("hospital", "동물병원");
  const handleParkLocationClick = () => showMarkers("park", "여행지");


  // 지도 로딩 후 실행
  const initializeMap = () => {
    const center = new window.naver.maps.LatLng(...INITIAL_CENTER);
    const mapOptions = {
      center,
      zoom: initialZoom,
    };
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;
  };
  // 스크립트 로드 후 실행
  const handleScriptLoad = () => {
    initializeMap();
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
      <button
        className="flex justify-center items-cnter"
        onClick={handleHospitalLocationClick}
        style={{ position: "absolute", top: 10, left: "20%", zIndex: 999 }}
      >
        동물병원
      </button>
      <button
        className="flex justify-center items-cnter"
        onClick={handleParkLocationClick}
        style={{ position: "absolute", top: 10, left: "30%", zIndex: 999 }}
      >
        공원
      </button>
      <div id={mapId} style={{ width: "90%", height: "500px" }} />
    </>
  );
}
