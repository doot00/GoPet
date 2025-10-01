"use client";

import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import MapSection from "../components/Map/MapSection";

const cafe = () => {
  const { isNavOpen, toggleNav } = useToggleNav(false);
  return (
    <>
    <section>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
    </section>
    <div style={{ width: "100%", height: "500px"}}>
      <MapSection/>
    </div>
    </>
  );
};

export default cafe;
 