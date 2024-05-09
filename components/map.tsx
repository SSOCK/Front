'use client';

import { useEffect } from 'react';
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

export default function Map() {
  const { centerLat, centerLng } = useRecoilValue(MapRecoil);
  const resetMapRecoil = useResetRecoilState(MapRecoil);

  useEffect(() => {
    if (navigator.geolocation) {
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

          // 지도 흑백
          const mapImg = mapDom.querySelectorAll('img');
          mapImg.forEach((img) => {
            img.classList.add('grayscale');
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

            if (centerLat !== 0) {
              const moveLatLng = new window.kakao.maps.LatLng(
                centerLat,
                centerLng
              );
              map.setCenter(moveLatLng);
              resetMapRecoil();
            }
          });
        });
      });
    }
  }, [centerLat]);

  return <div id="map" className="w-full h-full" />;
}
