'use client';

import { useRef, useState } from 'react';
import { HeadBar, Map, Navigation } from '@components';
import { Button } from '@components/ui/button';
import Menu from './menu';

export default function Home() {
  const [mode, setMode] = useState(false);
  const modeRef = useRef(false);

  const changeMode = () => {
    setMode(!mode);
    modeRef.current = !modeRef.current;
  };

  return (
    <>
      <HeadBar />
      <main className="mainPart w-full h-full relative">
        <Map modeRef={modeRef} />
        <Menu />
        {/* <Button className="fixed z-50" onClick={changeMode}>
          {mode ? '끝내기' : '그리기'}
        </Button> */}
      </main>
    </>
  );
}
