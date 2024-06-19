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
  setMapIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Map({ mapRef, setMapIsLoading }: MapProps) {
  useEffect(() => {
    console.log('render!!');
    const kakaoMap = window.kakao.maps;
    kakaoMap.load(function () {
      let now = new kakaoMap.LatLng(33.450701, 126.570667);

      console.log(now);
      const container = document.getElementById('map');
      const mapOptions = {
        center: now,
        level: 3,
      };
      const map = new kakaoMap.Map(container, mapOptions);

      if ('geolocation' in window.navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords);
          map.setCenter(
            new kakaoMap.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        });
      }

      const myMap: MyMap = {
        maps: kakaoMap,
        map: map,
        data: { drawMode: false, dots: [], dotMarkers: [], polyLine: {} },
      };

      if (mapRef) {
        mapRef.current = myMap;
      }

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

      setMapIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="map" className="w-full h-full" />;
}
