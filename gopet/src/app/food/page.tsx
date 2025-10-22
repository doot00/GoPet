import Script from "next/script";
import MapComponent from "../components/Map/MapComponent";
import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";

export default function Food() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
      />
      <MapComponent />
    </>
  );
}
