'use client';
import LocalHotel from "./components/main/LocalHotel";
import Adopt from "./components/main/Adopt";
import FestivalList from "./components/main/FestivalList";
import Header from "./components/main/Header";
import { useToggleNav } from "./components/hooks/useToggleNav";

const Home = () => {
    const { isNavOpen, toggleNav} = useToggleNav(true);
    return (
        <>
            <Header isNavOpen={isNavOpen} toggleNav={toggleNav}/>
            <FestivalList />
            <LocalHotel />
            <Adopt />
        </>
    )
}

export default Home;