'use client';

import { useState } from 'react';
import { Button } from '@components/ui/button';
import { latLng, myMap } from './page';

interface MenuProps {
  mapRef: React.MutableRefObject<myMap | undefined>;
}

export default function Menu({ mapRef }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [drawMode, setDrawMode] = useState(false);
  const [dots, setDots] = useState<latLng[]>([]);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`flex absolute z-50 w-96 top-0 h-full ease-in-out transition-transform duration-300 ${isOpen && '-translate-x-full'}`}
    >
      <div className="bg-white w-96 h-full border-r ">
        <h1 className="text-xs">{JSON.stringify(dots)}</h1>
        <Button
          onClick={() => {
            if (mapRef.current === undefined) return;
            const myMap: myMap = mapRef.current;
            myMap.data.drawMode = !myMap.data.drawMode;
            //그리기 아닐때는 draggable 막기
            myMap.data.dotMarkers.forEach((marker) => {
              marker.K = myMap.data.drawMode; //marker object 뜯어서 찾음...
              console.log(marker);
            });
            setDrawMode(myMap.data.drawMode);
            setDots(myMap.data.dots);
          }}
        >
          {drawMode ? '끝내기' : '그리기'}
        </Button>
      </div>

      <button
        className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 bg-white h-12 border border-l-0 border-primary p-1 rounded-r font-bold text-primary"
        onClick={toggleIsOpen}
      >
        {isOpen ? `>` : '<'}
      </button>
    </div>
  );
}
