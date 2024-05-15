'use client';

import { useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn';
import { DrawLineRecoil, MapRecoil } from '@atoms';

export default function MapMenu() {
  const [renew, setRenew] = useState(false);
  const setMap = useSetRecoilState(MapRecoil);
  const [{ drawFlag }, setDrawLine] = useRecoilState(DrawLineRecoil);

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

  const handlePencil = () =>
    setDrawLine((prev) => ({ ...prev, drawFlag: !drawFlag }));

  const handelRefresh = () => {
    // 경로 없애기
  };

  return (
    <div className="fixed right-4 top-24 z-50">
      <Avatar
        className="bg-white flex items-center justify-center"
        onClick={handleLayer}
      >
        <AvatarImage src={'/icons/layer.svg'} className="w-2/3 h-2/3" />
        <AvatarFallback>
          <h6 className="text-xs">속성</h6>
        </AvatarFallback>
      </Avatar>

      <div className="py-4">
        <Avatar
          className="bg-white flex items-center justify-center"
          onClick={handleLoc}
        >
          <AvatarImage src={'/icons/location.svg'} className="w-2/3 h-2/3" />
          <AvatarFallback>
            <h6 className="text-xs">위치</h6>
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="pb-4">
        <Avatar
          className="bg-white flex items-center justify-center"
          onClick={handlePencil}
        >
          <AvatarImage src={'/icons/pencil.svg'} className="w-3/5 h-3/5" />
          <AvatarFallback>
            <h6 className="text-xs">생성</h6>
          </AvatarFallback>
        </Avatar>
      </div>

      {renew ? (
        <Avatar
          className="bg-white flex items-center justify-center"
          onClick={handelRefresh}
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
