'use client';

import MapComponent from "../components/Map/MapComponent";
import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";

export default function Hotel() {
  const { isNavOpen, toggleNav } = useToggleNav(false);
  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav}/>
      <MapComponent/>   
    </>
  );
}
