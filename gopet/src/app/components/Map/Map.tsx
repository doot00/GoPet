import React, { useEffect, useRef } from "react";
import Script from "next/script";
import type { Coordinates } from "./types/store";
import { NaverMap } from "./types/map";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../hooks/useMap";
import selter from "../../../selter.json";

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

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 2,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    selter.forEach((data) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(Number(data.lat), Number(data.lng)),
        map: map,
        title: data.name,
        icon: {
          url:'/picture_images/map/selter_marker.png',
          scaledSize: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(25, 25)
        }
      });
    });
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
          style={{ position: "absolute", top: 10, left:"50%", transform: "translateX(-50%)", zIndex: 999 }}
        >
          현재 위치
        </button>
      </div>
    </>
  );
};

export default Map;
