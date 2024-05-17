'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@shadcn';

declare global {
  interface Window {
    kakao: any;
  }
}

interface latLng {
  La: number;
  Ma: number;
}

interface clickEvent {
  //카카오 clickevnet객체 La Ma 위도경도 x y viewport 기준 클릭좌표 인듯
  point: { x: number; y: number };
  latLng: latLng;
}

export default function Map() {
  const dots: latLng[] = [];
  const dotMarkers = [];
  let drawMode = false;
  const flipDrawMode = () => {
    drawMode = !drawMode;
  };

  useEffect(() => {
    console.log('effect');
    const kakaoMap = window.kakao.maps;
    kakaoMap.load(() => {
      const container = document.getElementById('map');
      const mapOptions = {
        center: new kakaoMap.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakaoMap.Map(container, mapOptions);

      const polyline = new kakaoMap.Polyline({
        map: map,
        path: dots,
        strokeWeight: 2,
        strokeColor: '#FF00FF',
        strokeOpacity: 0.8,
        strokeStyle: 'dashed',
      });

      const addMarker = (latLng: latLng) => {
        const marker = new kakaoMap.Marker({
          map: map,
          position: latLng,
          draggable: true,
        });
        marker.index = dots.length;
        kakaoMap.event.addListener(marker, 'dragend', () => {
          console.log(dots, marker.index);
          dots[marker.index] = marker.getPosition();
          polyline.setPath(dots);
          console.log(dots);
        });
        dots.push(latLng);
        marker.setMap(map);
        dotMarkers.push(marker);
        polyline.setPath(dots);
        console.log(dots);
      };

      kakaoMap.event.addListener(map, 'click', ({ latLng }: clickEvent) => {
        if (drawMode) addMarker(latLng);
      });
    });
  });

  return (
    <>
      <div id="map" className="w-full h-full">
        <div className="fixed right-0 z-50 p-5 flex flex-col gap-5">
          <Button onClick={flipDrawMode}>그리기</Button>
        </div>
      </div>
    </>
  );
}
