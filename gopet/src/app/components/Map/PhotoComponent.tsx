"use client";

import { useEffect, useState } from "react";
import KcisaApi from "@/app/api/KcisaApi";

type Place = {
  title: string;
  lat: number;
  lng: number;
  address?: string;
  photoUrl?: string;
};

export default function KCISAWithNearbyPhotos() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const kcisaList = await KcisaApi();

      const validCoordinates = kcisaList
        .filter(
          (item: any) =>
            !isNaN(parseFloat(item.lat)) && !isNaN(parseFloat(item.lng))
        )
        .map((item: any) => ({
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng),
        }));

      const top5 = validCoordinates.slice(0, 5);
      console.log(top5);

      // 5개의 배열이 photoUrl: 값을 가져오면 되지 않나? 

      // Google 이미지 붙이기
      const withPhotos = await Promise.all(
        top5.map(async (p: any) => {
          try {
            const res = await fetch(`/api/nearby?lat=${p.lat}&lng=${p.lng}`);
            const data = await res.json();
            return { ...p, photoUrl: data.photoUrl || null };
          } catch(error) {
            console.error("google error: ", error);
            return { ...p, photoUrl: null};
          }
        })
      );
      // 최종 결과 저장
      setPlaces(withPhotos);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {places.slice(0, 5).map((p, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-4">
          {p.photoUrl ? (
            <img
              src={p.photoUrl}
              alt={p.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
              이미지 없음
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
