'use client';

import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { MapRecoil } from '@atoms';

declare global {
  interface Window {
    kakao: any;
  }
}

interface ClickLatLng {
  La: number;
  Ma: number;
}

interface KakaoLatLng {
  (lat: number, lng: number): void;
}

export default function Map() {
  const [loadMap, setLoadMap] = useState(false);
  const changeMapCenterRef = useRef<KakaoLatLng>();
  const makeMapMarkerRef = useRef<KakaoLatLng>();
  const { centerLat, centerLng } = useRecoilValue(MapRecoil);
  const resetMapRecoil = useResetRecoilState(MapRecoil);

  useEffect(() => {
    if (loadMap) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const KakaoMaps = window.kakao.maps;
      KakaoMaps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new KakaoMaps.LatLng(lat, lng),
          level: 3,
        };

        const map = new KakaoMaps.Map(container, options);
        const mapDom = map.a as Document; // 이벤트 다루기위함
        setLoadMap(true);

        changeMapCenterRef.current = (lat: number, lng: number) =>
          map.setCenter(new KakaoMaps.LatLng(lat, lng));

        makeMapMarkerRef.current = (lat: number, lng: number) => {
          const marker = new KakaoMaps.Marker({
            position: new KakaoMaps.LatLng(lat, lng),
          });
          marker.setMap(map);
        };

        // 지도 흑백
        const mapImg = mapDom.querySelectorAll('img');
        mapImg.forEach((img) => {
          img.classList.add('grayscale');
        });

        const linePath1 = [
          new KakaoMaps.LatLng(33.452344169439975, 126.56878163224233),
          new KakaoMaps.LatLng(33.452739313807456, 126.5709308145358),
          new KakaoMaps.LatLng(33.45178067090639, 126.5726886938753),
        ];

        const line = new KakaoMaps.Polyline({
          path: linePath1,
          strokeWeight: 10,
          strokeColor: '#FFAE00',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
          clickable: true,
        });
        line.setMap(map);

        // 카카오 api에서는 line에 이벤트는 따로 없어서 직접 구현해야할듯??

        const paths = mapDom.querySelectorAll('path');
        paths.forEach((a) => {
          a.addEventListener('mouseover', () => (a.style.strokeWidth = '20'));
          a.addEventListener('mouseout', () => (a.style.strokeWidth = '10'));
        });

        // click (해당 위도, 경도 표출)
        KakaoMaps.event.addListener(
          map,
          'click',
          (mouseEvent: { latLng: ClickLatLng }) => {
            const latlng = mouseEvent.latLng;
            console.log('클릭할 경우 정보 출력!', latlng);
          }
        );

        // bounds_changed (지도 확대축소, 중심 이동 등)
        KakaoMaps.event.addListener(map, 'bounds_changed', () => {
          const mapImg = mapDom.querySelectorAll('img');
          mapImg.forEach((img) => {
            img.classList.add('grayscale');
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    if (!loadMap || centerLat === 0) return;
    changeMapCenterRef.current!(centerLat, centerLng);
    makeMapMarkerRef.current!(centerLat, centerLng);
    resetMapRecoil();
  }, [centerLat]);

  return <div id="map" className="w-full h-full" />;
}
