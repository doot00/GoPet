'use client';
import LocalHotel from "./components/main/LocalHotel";
import Adopt from "./components/main/Adopt";
import Header from "./components/main/Header";
import { useToggleNav } from "./components/hooks/useToggleNav";
import VolunteerList from "./components/main/VolunteerList";

const Home = () => {
    const { isNavOpen, toggleNav} = useToggleNav(true);
    return (
        <>
            <Header isNavOpen={isNavOpen} toggleNav={toggleNav}/>
            <LocalHotel />
            <VolunteerList />
            <Adopt />
        </>
    )
}

export default Home;