'use client';

import { useEffect } from 'react';
import { MyMap, LatLng } from '@/app/map/page';

declare global {
  interface Window {
    kakao: any;
  }
}

interface clickEvent {
  point: { x: number; y: number };
  latLng: LatLng;
}

interface MapProps {
  mapRef: React.MutableRefObject<MyMap | undefined>;
}

export default function Map({ mapRef }: MapProps) {
  useEffect(() => {
    const kakaoMap = window.kakao.maps;
    kakaoMap.load(() => {
      const myMap: MyMap = {
        maps: { ...kakaoMap },
        data: { drawMode: false, dots: [], dotMarkers: [], polyLine: {} },
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
      myMap.data.polyLine = polyline;
      const addMarker = (latLng: LatLng) => {
        const marker = new kakaoMap.Marker({
          map: map,
          position: latLng,
          draggable: true,
        });

        marker.index = dots.length;
        kakaoMap.event.addListener(marker, 'dragend', () => {
          dots[marker.index] = marker.getPosition();
          polyline.setPath(dots);
        });

        dots.push(latLng);
        marker.setMap(map);
        dotMarkers.push(marker);
        polyline.setPath(dots);
      };

      kakaoMap.event.addListener(map, 'click', ({ latLng }: clickEvent) => {
        if (myMap.data.drawMode) addMarker(latLng);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="map" className="w-full h-full" />;
}
