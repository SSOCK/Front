'use client';

import { useRef, useState } from 'react';
import { HeadBar, Map, Navigation } from '@components';
import { Button } from '@shadcn';

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
      <main className="mainPart w-full h-full">
        <Map modeRef={modeRef} />
        <Button className="fixed z-50" onClick={changeMode}>
          {mode ? '끝내기' : '그리기'}
        </Button>
      </main>
      <Navigation />
    </>
  );
}
