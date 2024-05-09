'use client';

import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn';

export default function MapMenu() {
  const layerRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLDivElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);

  const handleLayer = () => {
    console.log('layer!');
    //지도 속성 바꾸기
  };
  const handleLoc = () => {
    console.log('loc!');
    // 현 위치로 이동
  };
  const handlePencil = () => {
    console.log('pencil');
    // 경로 그리기
  };

  useEffect(() => {
    const layer = layerRef.current;
    const loc = locRef.current;
    const pencil = pencilRef.current;

    if (layer) layer.addEventListener('click', handleLayer);
    if (loc) loc.addEventListener('click', handleLoc);
    if (pencil) pencil.addEventListener('click', handlePencil);

    return () => {
      if (layer) layer.removeEventListener('click', handleLayer);
      if (loc) loc.removeEventListener('click', handleLoc);
      if (pencil) pencil.removeEventListener('click', handlePencil);
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
  );
}
