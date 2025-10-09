"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { Coordinates } from "./types/store";
import { NaverMap } from "./types/map";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../hooks/useMap";
import selter from "../../../selter.json";
import KcisaApi from "../../api/KcisaApi";
import styles from "./Map.module.css";

declare global {
  interface Window {
    naver: any;
  }
}

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
  searchQuery?: string;
  address?: string;
  orders?: string;
};

// 버튼 컴포넌트 따로 리펙토링..... 벗 너무 구리다 프로젝트가 ㅠ 구리귈..구리구리..넘 구리해 샤하고 빵한걸로좀 하고싶다

const Map = ({
  mapId = "map",
  initialCenter: Coordinates,
  initialZoom: number,
}: Props) => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const infoRaf = useRef<naver.maps.InfoWindow | null>(null);

  const [address, setAddress] = useState("");
  const [showHotel, setShowHotel] = useState(false);
  const [hotelMarkers, setHotelMarkers] = useState<naver.maps.Marker[]>([]);

  const [showPark, setShowPark] = useState(false);
  const [parkMarkers, setParkMarkers] = useState<naver.maps.Marker[]>([]);

  const [showSelter, setShowSelter] = useState(false);
  const [selterMarkers, setSelterMarkers] = useState<naver.maps.Marker[]>([]);

  const [showHospital, setShowHospital] = useState(false);
  const [hospitalMarkers, setHospitalMarkers] = useState<naver.maps.Marker[]>(
    []
  );

  const [showCafe, setShowCafe] = useState(false);
  const [cafeMarkers, setCafeMarkers] = useState<naver.maps.Marker[]>([]);

  const [showFood, setShowFood] = useState(false);
  const [foodMarkers, setFoodMarkers] = useState<naver.maps.Marker[]>([]);

  // 현재 위치 버튼
  const handleCurrentLocationClick = () => {
    if (!mapRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        new naver.maps.Marker({
          position: currentLocation,
          map: mapRef.current!,
          title: "현재 위치",
        });
        mapRef.current!.setCenter(currentLocation);
      });
    }
  };

  // 보호소 위치 버튼
  const handleSelterLocationClick = () => {
    if (showSelter) {
      // 마커 제거
      selterMarkers.forEach((marker) => marker.setMap(null));
      setSelterMarkers([]);
      setShowSelter(false);
    } else {
      // 마커 생성
      const newMarkers = selter.map((data) => {
        const marker = new window.naver.maps.Marker({
          position: new naver.maps.LatLng(Number(data.lat), Number(data.lng)),
          map: mapRef.current!,
          region: data.region,
          phone: data.phone,
          title: data.name,
          icon: {
            url: "/picture_images/map/selter_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
        // Marker클릭 시에만 주소창을 열도록
        naver.maps.Event.addListener(marker, "click", () => {
          // 마커의 정보를 모달로 표시
          const modal = document.getElementById("modal");
          const modalContent = document.getElementById("modalContent");
          const modalLatlng = document.getElementById("modalLatlng");
          const latlng = marker.getPosition(); // LatLng 객체
          searchCoordinateToAddress(latlng, data.name);

          if (modal && modalContent && modalLatlng) {
            modal.classList.remove("hidden");
            modalContent.innerHTML = data.name;
          }

        });
        // setCoords({ lat: data.lat, lng: data.lng }); // 원하면 유지
        return marker;
      });
      setSelterMarkers(newMarkers);
      setShowSelter(true);
    }
  };

  // 동물병원 위치 버튼
  const handleHospitalLocationClick = async () => {
    if (!mapRef.current) return;
    if (showHospital) {
      hospitalMarkers.forEach((marker) => marker.setMap(null));
      setHospitalMarkers([]);
      setShowHospital(false);
    } else {
      const hospitals = await KcisaApi("동물병원");
      const firstHospitals = hospitals.slice(0, 30);
      const newMarkers = firstHospitals.map((hospital: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(hospital.lat, hospital.lng),
          map: mapRef.current!,
          title: hospital.title,
          icon: {
            url: "/picture_images/map/animalhospital_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });

        naver.maps.Event.addListener(marker, "click", (e: any) => {
          const latlng = new naver.maps.LatLng(hospital.lat, hospital.lng);
          const modal = document.getElementById("modal");
          const modalContent = document.getElementById("modalContent");
          searchCoordinateToAddress(latlng, hospital.title);

          if (modal && modalContent && latlng) {
            modal.classList.remove("hidden");
            modalContent.innerHTML = hospital.title;
          }
        });
        return marker;
      });
      setHospitalMarkers(newMarkers);
      setShowHospital(true);
    }
  };

  // 카페 위치 버튼
  const handleCafeLocationClick = async () => {
    if (!mapRef.current) return;
    if (showCafe) {
      cafeMarkers.forEach((marker) => marker.setMap(null));
      setCafeMarkers([]);
    } else {
      const cafes = await KcisaApi("카페");

      const firstCafes = cafes.slice(0, 30);
      const newMarkers = firstCafes.map((cafe: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(cafe.lat, cafe.lng),
          map: mapRef.current!,
          title: cafe.title,
          icon: {
            url: "/picture_images/map/cafe_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
        naver.maps.Event.addListener(marker, "click", (e: any) => {
          const latlng = new naver.maps.LatLng(cafe.lat, cafe.lng);
          const modal = document.getElementById("modal");
          const modalContent = document.getElementById("modalContent");
          searchCoordinateToAddress(latlng, cafe.title);

          if (modal && modalContent && latlng) {
            modal.classList.remove("hidden");
            modalContent.innerHTML = cafe.title;
          }
        });
        return marker;
      });
      setCafeMarkers(newMarkers);
      setShowCafe(true);
    }
  };

  // 숙박 위치 버튼
  const handleHotelLocationClick = async () => {
    if (!mapRef.current) return;
    if (showHotel) {
      hotelMarkers.forEach((marker) => marker.setMap(null));
      setHotelMarkers([]);
    } else {
      const hotels = await KcisaApi("펜션");

      const firstHotels = hotels.slice(0, 30);
      const newMarkers = firstHotels.map((hotel: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(hotel.lat, hotel.lng),
          map: mapRef.current!,
          title: hotel.title,
          icon: {
            url: "/picture_images/map/hotel_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
        naver.maps.Event.addListener(marker, "click", (e: any) => {
          const latlng = new naver.maps.LatLng(hotel.lat, hotel.lng);
          const modal = document.getElementById("modal");
          const modalContent = document.getElementById("modalContent");
          searchCoordinateToAddress(latlng, hotel.title);

          if (modal && modalContent && latlng) {
            modal.classList.remove("hidden");
            modalContent.innerHTML = hotel.title;
          }
        });
        return marker;
      });
      setHotelMarkers(newMarkers);
      setShowHotel(true);
    }
  };

  // 음식 위치 버튼
  const handleFoodLocationClick = async () => {
    if (!mapRef.current) return;
    if (showFood) {
      foodMarkers.forEach((marker) => marker.setMap(null));
      setFoodMarkers([]);
    } else {
      const foods = await KcisaApi("식당");
      const firstFoods = foods.slice(0, 30);

      const newMarkers = firstFoods.map((food: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(food.lat, food.lng),
          map: mapRef.current!,
          title: food.title,
          icon: {
            url: "/picture_images/map/food_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });
        naver.maps.Event.addListener(marker, "click", (e: any) => {
          const latlng = new naver.maps.LatLng(food.lat, food.lng);
          const modal = document.getElementById("modal");
          const modalContent = document.getElementById("modalContent");
          searchCoordinateToAddress(latlng, food.title);

          if (modal && modalContent && latlng) {
            modal.classList.remove("hidden");
            modalContent.innerHTML = food.title;
          }
        });
        return marker;
      });
      setFoodMarkers(newMarkers);
      setShowFood(true);
    }
  };

  // 공원 위치 버튼
  const handleParkLocationClick = async () => {
    if (!mapRef.current) return;
    if (showPark) {
      parkMarkers.forEach((marker) => marker.setMap(null));
      setParkMarkers([]);
      setShowPark(false);
    } else {
      const parks = await KcisaApi("여행지");
      const firstParks = parks.slice(0, 30);

      const newMarkers = firstParks.map((park: any) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(park.lat, park.lng),
          map: mapRef.current!,
          title: park.title,
          icon: {
            url: "/picture_images/map/park_marker.png",
            scaledSize: new naver.maps.Size(50, 50),
            anchor: new naver.maps.Point(25, 25),
          },
        });

        naver.maps.Event.addListener(marker, "click", (e: any) => {
          const latlng = new naver.maps.LatLng(park.lat, park.lng);
          const modal = document.getElementById("modal");
          const modalContent = document.getElementById("modalContent");
          searchCoordinateToAddress(latlng, park.title);

          if (modal && modalContent && latlng) {
            modal.classList.remove("hidden");
            modalContent.innerHTML = park.title;
          }
        });
        return marker;
      });
      setParkMarkers(newMarkers);
      setShowPark(true);
    }
  };

  // 좌표 -> 주소 변환
  function searchCoordinateToAddress(
    latlng: naver.maps.LatLng,
    title?: string
  ) {
    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("Something Wrong!");
        }

        const items = response?.v2?.results || response?.result?.items || [];
        const htmlAddresses: string[] = [];
        
        // makeAddress
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const address =
          item.region.area1.name +
          " " +
          item.region.area2.name +
          " " +
          item.region.area3.name +
          " " +
          item.region.area4.name +
          (item.land.number1 ? " " + item.land.number1 : "") +
          (item.land.number2 ? "-" + item.land.number2 : "") +
          (item.land.addition0?.value ? " " + item.land.addition0.value : "");
          
          const name = item.name;
          const addrType =
          item.name === "roadaddr" ? "[도로명 주소]" : "[지번 주소]";
          
          htmlAddresses.push(`${i + 1}. ${addrType} ${address}`);
        }
        const modalContent = document.getElementById("modalContent");
        const modalLatlng = document.getElementById("modalLatlng");

        const allAddress = htmlAddresses.join("<br/>");
        if (modalContent) modalContent.innerHTML = `${title}`;
        if (modalLatlng)
          modalLatlng.innerHTML = `${allAddress}`;
        
        const contentHtml = `
        <div style="position:relative;padding:10px;min-width:200px;min-height:100px;line-height:140%;font-size:12px;">
        <h2>${title || "정보없음"}</h2>
              ${htmlAddresses.join("<br />")}
              </div>
          `;
        infoRaf.current?.setContent(contentHtml);
        infoRaf.current?.open(mapRef.current!, latlng);
      }
    );
  }

  // 지도 초기화
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...INITIAL_CENTER),
      zoom: INITIAL_ZOOM,
      minZoom: 6,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT,
      },
    };
    // 지도 Id, options
    const map = new window.naver.maps.Map(mapId, mapOptions);
    map.setCursor("pointer");
    mapRef.current = map;

    infoRaf.current = new naver.maps.InfoWindow({
      content: "",
      maxWidth: 100,
      backgroundColor: "white",
      anchorSize: new naver.maps.Size(0, 0),
      anchorColor: "white",
      pixelOffset: new naver.maps.Point(5, -25),
    });

    // 주소를 좌표로 변환
    function searchAddressToCoordinate(address: any) {
      naver.maps.Service.geocode(
        {
          query: address,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert("Something Wrong!");
          }

          if (response.v2.meta.totalCount === 0) {
            return alert("주소를 찾을 수 없습니다.");
          }

          const htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.LatLng(
              parseFloat(item.x),
              parseFloat(item.y)
            );

          mapRef.current?.setCenter(point);

          if (item.roadAddress) {
            htmlAddresses.push("[도로명 주소] " + item.roadAddress);
          }

          if (item.jibunAddress) {
            htmlAddresses.push("[지번 주소] " + item.jibunAddress);
          }

          if (item.englishAddress) {
            htmlAddresses.push("[영문명 주소] " + item.englishAddress);
          }
          // infoWindow 내용
          infoRaf.current?.setContent(`
            <div style="padding:10px;min-width:200px;line-height:150%;">
              <h4 style="margin-top:5px;">검색 주소: ${address}</h4><br />
              ${htmlAddresses.join("<br />")}
            </div>
          `);

          infoRaf.current?.open(mapRef.current!, point);
        }
      );
    }

    KcisaApi();
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        onReady={initializeMap}
      />
      <div
        id={mapId}
        style={{
          width: "calc(100% - 10px)",
          height: "100%",
          position: "relative",
          marginLeft: "0px",
          marginRight: "10px",
        }}
      >
        <button
          className="flex justify-center items-center px-4 py-2 bg-white/60 rounded-2xl"
          onClick={handleCurrentLocationClick}
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
          }}
        >
          현재 위치
        </button>
        <button
          className="flex justify-center items-center"
          onClick={handleSelterLocationClick}
          style={{ position: "absolute", top: 10, left: "10%", zIndex: 999 }}
        >
          보호소
        </button>
        <button
          className="flex justify-center items-cnter"
          onClick={handleHospitalLocationClick}
          style={{ position: "absolute", top: 10, left: "20%", zIndex: 999 }}
        >
          동물병원
        </button>
        <button
          className="flex justify-center items-cnter"
          onClick={handleCafeLocationClick}
          style={{ position: "absolute", top: 10, left: "30%", zIndex: 999 }}
        >
          카페
        </button>
        <button
          className="flex justify-center items-cnter"
          onClick={handleFoodLocationClick}
          style={{ position: "absolute", top: 10, left: "60%", zIndex: 999 }}
        >
          음식
        </button>
        <button
          className="flex justify-center items-cnter"
          onClick={handleHotelLocationClick}
          style={{ position: "absolute", top: 10, left: "70%", zIndex: 999 }}
        >
          숙박
        </button>
        <button
          className="flex justify-center items-cnter"
          onClick={handleParkLocationClick}
          style={{ position: "absolute", top: 10, left: "80%", zIndex: 999 }}
        >
          공원
        </button>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* 모달  */}
        <div id="modal" className={styles.modal}>
          <div className={styles.modal_content}>
            <p id="modalContent" className="text-xl font-bold" />
            <p id="modalLatlng" className="text-black" />
            <button
              className="m-5 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                const modal = document.getElementById("modal");
                if (modal) modal.classList.add("hidden");
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
