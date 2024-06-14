'use client';

import { useRef } from 'react';
import { HeadBar, Map } from '@components';
import Menu from './menu';

export interface latLng {
  La: number;
  Ma: number;
}

export interface myMap {
  maps: object;
  data: {
    drawMode: boolean;
    dots: latLng[];
    dotMarkers: any[];
  };
}

export default function Home() {
  const mapRef = useRef<myMap | undefined>(undefined); // 카카오맵 객체 받아올곳

  return (
    <>
      <HeadBar />
      <main className="mainPart w-full h-full relative">
        <Map mapRef={mapRef} />
        <Menu mapRef={mapRef} />
      </main>
    </>
  );
}
