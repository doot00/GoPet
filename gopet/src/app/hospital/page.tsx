"use client";

import Script from "next/script";
import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import MapComponent from "../components/Map/MapComponent";

const hospital = () => {
  const { isNavOpen, toggleNav } = useToggleNav(false);
  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <div style={{ width: "90%", height: "950px" }}>
        <Script strategy="afterInteractive" src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}>
          <MapComponent />
        </Script>
      </div>
    </>
  );
};

export default hospital;
