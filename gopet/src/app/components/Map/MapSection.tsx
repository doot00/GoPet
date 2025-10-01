import useMap from "../hooks/useMap";
import Map from "./Map";
import { NaverMap } from "./types/map";


const MapSection = () => {
    const { initializeMap } = useMap();
    const onLoadMap = (map: NaverMap) => {
        initializeMap(map);
    }
    return (
        <>
            <Map onLoad={onLoadMap}/>
        </>
        // <Map onLoad={onLoadMap}/>
    )
    
}

export default MapSection;