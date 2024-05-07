'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(lat, lng), //지도의 중심좌표(현 위치).
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    });
  }, [lat, lng]);

  return <div id="map" className="w-full h-full" />;
}
