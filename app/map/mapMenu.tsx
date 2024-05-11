'use client';

import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { DrawLineRecoil, MapRecoil } from '@atoms';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn';

export default function MapMenu() {
  const layerRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLDivElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);
  const refreshRef = useRef<HTMLDivElement>(null);
  const [renew, setRenew] = useState(false);

  const setMap = useSetRecoilState(MapRecoil);
  const [{ drawFlag }, setDrawLine] = useRecoilState(DrawLineRecoil);
  const drawFlagRef = useRef(drawFlag);

  const handleLayer = () => {
    //지도 속성 바꾸기
    console.log('layer!');
  };

  const handleLoc = () => {
    // 현위치 위도, 경도 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMap((prev) => ({
          ...prev,
          centerLat: position.coords.latitude,
          centerLng: position.coords.longitude,
        }));
      });
    }
  };

  const handlePencil = () => {
    // 경로 그리기
    setDrawLine((prev) => ({ ...prev, drawFlag: !drawFlagRef.current }));
    drawFlagRef.current! = !drawFlagRef.current;
  };

  const handelRefresh = () => {
    // 경로 없애기
  };

  useEffect(() => {
    const layer = layerRef.current;
    const loc = locRef.current;
    const pencil = pencilRef.current;
    const refresh = refreshRef.current;

    if (layer) layer.addEventListener('click', handleLayer);
    if (loc) loc.addEventListener('click', handleLoc);
    if (pencil) pencil.addEventListener('click', handlePencil);
    if (refresh) refresh.addEventListener('click', handelRefresh);

    return () => {
      if (layer) layer.removeEventListener('click', handleLayer);
      if (loc) loc.removeEventListener('click', handleLoc);
      if (pencil) pencil.removeEventListener('click', handlePencil);
      if (refresh) refresh.removeEventListener('click', handelRefresh);
    };
  }, []);

  return (
    <div className="fixed right-4 top-24 z-50">
      <Avatar
        ref={layerRef}
        className="bg-white flex items-center justify-center"
      >
        <AvatarImage src={'/icons/layer.svg'} className="w-2/3 h-2/3" />
        <AvatarFallback>
          <h6 className="text-xs">속성</h6>
        </AvatarFallback>
      </Avatar>

      <div className="py-4">
        <Avatar
          ref={locRef}
          className="bg-white flex items-center justify-center"
        >
          <AvatarImage src={'/icons/location.svg'} className="w-2/3 h-2/3" />
          <AvatarFallback>
            <h6 className="text-xs">위치</h6>
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="pb-4">
        <Avatar
          ref={pencilRef}
          className="bg-white flex items-center justify-center"
        >
          <AvatarImage src={'/icons/pencil.svg'} className="w-3/5 h-3/5" />
          <AvatarFallback>
            <h6 className="text-xs">생성</h6>
          </AvatarFallback>
        </Avatar>
      </div>

      {renew ? (
        <Avatar
          ref={refreshRef}
          className="bg-white flex items-center justify-center"
        >
          <AvatarImage src={'/icons/refresh.svg'} className="w-3/5 h-3/5" />
          <AvatarFallback>
            <h6 className="text-xs">제거</h6>
          </AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
}
