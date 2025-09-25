import React, { useEffect, useRef } from "react";
import Script from "next/script";
import type { Coordinates } from "./types/store";
import { NaverMap } from "./types/map";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../hooks/useMap";

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

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 10,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT,
      },
    };

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
      <div id={mapId} style={{ width: "100%", height: "100%" }} />
    </>
  );
};

export default Map;
