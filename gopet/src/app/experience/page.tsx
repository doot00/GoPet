'use client';

import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";

const experience = () => {
  const { isNavOpen, toggleNav } = useToggleNav(false);
  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />;
    </>
  );
};

export default experience;
