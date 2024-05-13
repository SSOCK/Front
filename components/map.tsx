'use client';

import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { DrawLineRecoil, MapRecoil } from '@atoms';

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
  const mapRef = useRef();
  const changeMapCenterRef = useRef<KakaoLatLng>();
  const makeMapMarkerRef = useRef<KakaoLatLng>();
  const drawStartRef = useRef(false);
  const drawFlagRef = useRef(false);
  let lineRef = useRef<any>(null);
  let dotsRef = useRef<any>([]);
  const [{ drawFlag }, setDrawLine] = useRecoilState(DrawLineRecoil);
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
        mapRef.current = map;
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

        // 카카오 api에서는 line에 이벤트는 따로 없어서 직접 구현해야할듯??
        // const paths = mapDom.querySelectorAll('path');
        // paths.forEach((a) => {
        //   a.addEventListener('mouseover', () => (a.style.strokeWidth = '20'));
        //   a.addEventListener('mouseout', () => (a.style.strokeWidth = '10'));
        // });

        // bounds_changed (지도 확대축소, 중심 이동 등)
        KakaoMaps.event.addListener(map, 'bounds_changed', () => {
          const mapImg = mapDom.querySelectorAll('img');
          mapImg.forEach((img) => {
            img.classList.add('grayscale');
          });
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadMap) return;

    const KakaoMaps = window.kakao.maps;

    const deleteDrawLine = () => {
      if (lineRef.current) {
        lineRef.current.setMap(null);
        lineRef.current = null;
      }
    };

    const deleteLineDot = () => {
      dotsRef.current.forEach((dot: any) => {
        if (dot.dot) dot.dot.setMap(null);
        if (dot.distance) dot.distance.setMap(null);
      });
      dotsRef.current = [];
    };

    const displayLineDot = (position: ClickLatLng, distance: number) => {
      const dotOverlay = new KakaoMaps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
      });
      dotOverlay.setMap(mapRef.current);

      let distanceOverlay = new KakaoMaps.CustomOverlay({
        position: position,
        yAnchor: 1,
        zIndex: 2,
      });
      if (distance > 0) {
        distanceOverlay = new KakaoMaps.CustomOverlay({
          content:
            '<div class="dotOverlay">거리 <span class="number">' +
            distance +
            '</span>m</div>',
          position: position,
          yAnchor: 1,
          zIndex: 2,
        });
        distanceOverlay.setMap(mapRef.current);
      }
      dotsRef.current.push({ dot: dotOverlay, distance: distanceOverlay });
    };

    const checkingDrawFlag = () => {
      if (!drawFlag) {
        drawStartRef.current = false;
        drawFlagRef.current = false;
        deleteDrawLine();
        deleteLineDot();
        return true;
      }
      return false;
    };

    if (drawFlag) drawFlagRef.current = true;
    else {
      drawStartRef.current = false;
      drawFlagRef.current = false;
      deleteDrawLine();
      deleteLineDot();
      return;
    }

    KakaoMaps.event.addListener(
      mapRef.current,
      'click',
      (mouseEvent: { latLng: ClickLatLng }) => {
        const latlng = mouseEvent.latLng;

        if (checkingDrawFlag() || !drawFlagRef.current) return;

        if (!drawStartRef.current) {
          drawStartRef.current = true;
          deleteDrawLine();
          deleteLineDot();

          lineRef.current = new KakaoMaps.Polyline({
            map: mapRef.current,
            path: [latlng],
            strokeWeight: 10,
            strokeColor: '#FFAE00',
            strokeOpacity: 0.7,
            strokeStyle: 'solid',
            clickable: true,
          });
          displayLineDot(latlng, 0);
        } else {
          const path = lineRef.current.getPath();
          path.push(latlng);
          lineRef.current.setPath(path);

          const distance = Math.round(lineRef.current.getLength());
          displayLineDot(latlng, distance);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawFlag]);

  useEffect(() => {
    if (!loadMap || centerLat === 0) return;
    changeMapCenterRef.current!(centerLat, centerLng);
    makeMapMarkerRef.current!(centerLat, centerLng);
    resetMapRecoil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerLat]);

  return <div id="map" className="w-full h-full" />;
}
