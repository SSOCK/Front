'use client';

import { useEffect } from 'react';
import { HeadBar, Navigation, Post } from '@components';
import useLogout from '@hooks/useLogout';
import Posts from './posts';

export default function Home() {
  const logout = useLogout();

  useEffect(() => {
    if (!sessionStorage.getItem('access-token')) {
      logout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeadBar />
      <main className="mainPart flex flex-col items-center justify-between">
        <Posts></Posts>
      </main>
      <Navigation />
    </>
  );
}
