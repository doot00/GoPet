"use client";

import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import MapComponent from "../components/Map/MapComponent";

const cafe = () => {
  const { isNavOpen, toggleNav} = useToggleNav(false);
  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav}/>
      <div style={{ width: "100%", height: "950px"}}>
        <MapComponent/>   
      </div>
      
    </>
  );
};

export default cafe;
 