'use client';

import { useEffect } from 'react';
import { myMap, latLng } from '@/app/map/page';

declare global {
  interface Window {
    kakao: any;
  }
}

interface clickEvent {
  point: { x: number; y: number };
  latLng: latLng;
}

interface MapProps {
  mapRef: React.MutableRefObject<myMap | undefined>;
}

export default function Map({ mapRef }: MapProps) {
  useEffect(() => {
    const kakaoMap = window.kakao.maps;
    kakaoMap.load(() => {
      const myMap: myMap = {
        maps: { ...kakaoMap },
        data: { drawMode: false, dots: [], dotMarkers: [] },
      };
      if (mapRef) {
        mapRef.current = myMap;
      }
      const container = document.getElementById('map');
      const mapOptions = {
        center: new kakaoMap.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakaoMap.Map(container, mapOptions);

      const { dots, dotMarkers } = myMap.data;
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
        if (myMap.data.drawMode) addMarker(latLng);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="map" className="w-full h-full" />;
}
