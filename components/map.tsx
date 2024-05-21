'use client';

import { useEffect } from 'react';

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
  point: { x: number; y: number };
  latLng: latLng;
}

interface MapProps {
  modeRef?: React.MutableRefObject<boolean>;
}

export default function Map({ modeRef }: MapProps) {
  const dots: latLng[] = [];
  const dotMarkers = [];

  useEffect(() => {
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
        strokeWeight: 5,
        strokeColor: '#ff6600',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
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
        if (!modeRef || modeRef.current) addMarker(latLng);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="map" className="w-full h-full" />;
}
