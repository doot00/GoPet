import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import type { Coordinates } from '../Map/types/store';
import type { NaverMap } from '../Map/types/map';


export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);

  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map);
  }, []);

  const resetMapOptions = useCallback(() => {
    if (!map) return;
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  // const getMapOptions = useCallback(async() => {
  //   if (!map) return null;
  //   const mapCenter = map.getCenter();
  //   const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
  //   const zoom = map.getZoom();

    
  //   const address = await new Promise<string>((resolve) => {
  //     const latlng = new naver.maps.LatLng(center[0], center[1]);
  //     window.naver.maps.Service.reverseGeocode(
  //       {
  //         coords: latlng,
  //         orders: [
  //           window.naver.maps.Service.OrderType.ADDR,
  //           window.naver.maps.Service.OrderType.ROAD_ADDR,
  //         ],
  //       },(status: any, response: any) => {
  //         if (status === window.naver.maps.Service.Status.ERROR) {
  //           return alert('Something Wrong!');
  //         }

  //         const items = response.v2.results
  //         const addr =
  //           items.address?.jibunAddress ||
  //           items.roadAddress?.name ||
  //           '주소 정보 없음';

  //         resolve(addr);
  //       }
  //     );
  //   });
  //   return { center, zoom, address };
  // }, [map]);
  const getMapOptions = useCallback(async () => {
  if (!map) return null;
  const mapCenter = map.getCenter();
  const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
  const zoom = map.getZoom();

  const address = await new Promise<string>((resolve, reject) => {
    const latlng = new naver.maps.LatLng(center[0], center[1]);
    window.naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [
          window.naver.maps.Service.OrderType.ADDR,
          window.naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(','),
      },
      (status: any, response: any) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          reject(new Error('Reverse geocoding failed'));
          return;
        }

        const items = response.v2.results;
        if (!items || items.length === 0) {
          resolve('주소 정보 없음');
          return;
        }

        const item = items[0];
        const address =
          `${item.region.area1.name} ${item.region.area2.name} ${item.region.area3.name}` +
          (item.land?.number1 ? ` ${item.land.number1}` : '');

        resolve(address);
      }
    );
  });

  return { center, zoom, address };
}, [map]);




  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};
export default useMap;