import NavBar from "./components/main/NavBar";
import LocalHotel from "./components/main/LocalHotel";
import Adopt from "./components/main/Adopt";
import FestivalList from "./components/main/FestivalList";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
const Home = () => {

    return (
        <>
            <NavBar />
            <FestivalList />
            <LocalHotel />
            <Adopt />
        </>
    )
}

export default Home;