"use client";

import { useEffect, useState } from "react";
import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import MapSection from "../components/Map/MapSection";
import axios from "axios";  


const HospitalPage = () => {
  const { isNavOpen, toggleNav } = useToggleNav(false);

  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
      
      <MapSection />
    </>
  );
};

export default HospitalPage;
