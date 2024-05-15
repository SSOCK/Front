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
  const mapDomRef = useRef<Document>();
  const markerRef = useRef<any>();
  const changeMapCenterRef = useRef<KakaoLatLng>();
  const clickEventRef = useRef<any>();
  const grayEventRef = useRef<any>();
  const drawStartRef = useRef(false);
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
        mapDomRef.current = mapDom;
        setLoadMap(true);

        markerRef.current = new KakaoMaps.Marker({
          position: new KakaoMaps.LatLng(0, 0),
        });
        markerRef.current.setMap(map);

        changeMapCenterRef.current = (lat: number, lng: number) =>
          map.setCenter(new KakaoMaps.LatLng(lat, lng));

        // 카카오 api에서는 line에 이벤트는 따로 없어서 직접 구현해야할듯??
        // const paths = mapDom.querySelectorAll('path');
        // paths.forEach((a) => {
        //   a.addEventListener('mouseover', () => (a.style.strokeWidth = '20'));
        //   a.addEventListener('mouseout', () => (a.style.strokeWidth = '10'));
        // });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadMap || centerLat === 0) return;
    changeMapCenterRef.current!(centerLat, centerLng);
    markerRef.current.setPosition(
      new window.kakao.maps.LatLng(centerLat, centerLng)
    );
    resetMapRecoil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerLat]);

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

    const mapImg = mapDomRef.current!.querySelectorAll('img');
    if (drawFlag) mapImg.forEach((img) => img.classList.add('grayscale'));
    else {
      drawStartRef.current = false;
      deleteDrawLine();
      deleteLineDot();

      mapImg.forEach((img) => img.classList.remove('grayscale'));
      KakaoMaps.event.removeListener(
        mapRef.current,
        'click',
        clickEventRef.current
      );
      KakaoMaps.event.removeListener(
        mapRef.current,
        'bounds_changed',
        grayEventRef.current
      );
      return;
    }

    clickEventRef.current = (mouseEvent: { latLng: ClickLatLng }) => {
      const latlng = mouseEvent.latLng;

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
    };

    grayEventRef.current = () => {
      const mapImg = mapDomRef.current!.querySelectorAll('img');
      mapImg.forEach((img) => img.classList.add('grayscale'));
    };

    KakaoMaps.event.addListener(mapRef.current, 'click', clickEventRef.current);
    KakaoMaps.event.addListener(
      mapRef.current,
      'bounds_changed',
      grayEventRef.current
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawFlag]);

  return <div id="map" className="w-full h-full" />;
}
