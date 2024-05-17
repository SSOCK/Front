'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@shadcn';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const kakaoRef = useRef<any>();
  const managerRef = useRef<any>();
  const flipMode = (type: string) => {
    if (!kakaoRef.current || !managerRef.current) return;
    managerRef.current.select(kakaoRef.current.maps.Drawing.OverlayType[type]);
  };
  useEffect(() => {
    const kakao = window.kakao;
    kakaoRef.current = kakao;
    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const mapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(container, mapOptions);

      //Drawing manager options
      const drawingManagerOpt = {
        map: map,
        drawingMode: [kakao.maps.Drawing.OverlayType.POLYLINE],
        guideTooltip: ['draw', 'drag', 'edit'],
        markerOptions: {
          // 마커 옵션입니다
          draggable: true, // 마커를 그리고 나서 드래그 가능하게 합니다
          removable: true, // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다
        },
        polylineOptions: {
          // 선 옵션입니다
          draggable: true, // 그린 후 드래그가 가능하도록 설정합니다
          removable: true, // 그린 후 삭제 할 수 있도록 x 버튼이 표시됩니다
          editable: true, // 그린 후 수정할 수 있도록 설정합니다
          strokeColor: '#39f', // 선 색
          hintStrokeStyle: 'dash', // 그리중 마우스를 따라다니는 보조선의 선 스타일
          hintStrokeOpacity: 0.5, // 그리중 마우스를 따라다니는 보조선의 투명도
        },
      };

      const manager = new kakao.maps.Drawing.DrawingManager(drawingManagerOpt);
      manager.addListener('state_changed', () => {});
      managerRef.current = manager;
    });
  }, []);

  return (
    <>
      <div id="map" className="w-full h-full">
        <div className="fixed right-0 z-50 p-5 flex flex-col gap-5">
          <Button onClick={() => flipMode('POLYLINE')}>그리기</Button>
        </div>
      </div>
    </>
  );
}
