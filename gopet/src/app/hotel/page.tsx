'use client';

import Header from "../components/main/Header";
import Map from "../components/Map/Map";

const hotel = () => {
  return (
    <>
      <div style={{ width: "100%", height: "500px"}}>  
        <Map onLoad = {
          () => {
            console.log('load');
            
          }}/>
        <Map/>
      </div>
    </>
  );
};

export default hotel;
