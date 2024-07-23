'use client';

import { useRef, useState } from 'react';
import { HeadBar, Map, MyMap } from '@components';
import Menu from './menu';

export default function Home() {
  const mapRef = useRef<MyMap | undefined>(undefined); // 카카오맵 객체 받아올곳
  const [mapIsLoading, setMapIsLoading] = useState(true);

  return (
    <>
      <HeadBar />
      <main className="mainPart w-full h-full relative">
        <Map mapRef={mapRef} setMapIsLoading={setMapIsLoading} />
        {mapIsLoading ? null : <Menu mapRef={mapRef} />}
      </main>
    </>
  );
}
