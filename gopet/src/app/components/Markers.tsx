// import useSWR from "swr";
// import { NaverMap } from "./Map/types/map";
// import { MAP_KEY } from "./hooks/useMap";
// import { Store } from "./Map/types/store";
// import Marker from "./Marker";

// const Markers = () => {
//     const { data: map } = useSWR<NaverMap>(MAP_KEY);
//     const { data: stores } = useSWR<Store[]>(STORE_KEY);

//     if (!map || !stores) return null;

//     return (
//         <>
//             {stores.map((store) => {
//                 return (
//                     <Marker
//                     map={map} 
//                     coordinates={store.coordinates}
//                     key={store.nid}
//                     />
//                 )
//             })}
//         </>
//     )
// }

// export default Markers;