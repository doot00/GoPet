"use client";

import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import MapSection from "../components/Map/MapSection";

const hotel = () => {
  const { isNavOpen, toggleNav} = useToggleNav(false);
  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav}/>
      <div style={{ width: "100%", height: "950px"}}>
        <MapSection/>   
      </div>
      
    </>
  );
};

export default hotel;
 