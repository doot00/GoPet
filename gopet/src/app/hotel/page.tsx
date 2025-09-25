'use client';

import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import MapSection from "../components/Map/MapSection";

const hotel = () => {
  const { isNavOpen, toggleNav} = useToggleNav(false);
  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav}/>;
      <MapSection/>
      
    </>
  );
};

export default hotel;
