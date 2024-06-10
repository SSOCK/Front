'use client';

import { useEffect } from 'react';
import { HeadBar, Navigation } from '@components';
import { refreshAccessToken } from '@utils/fetch';
import logout from '@utils/logout';
import Posts from './posts';

export default function Home() {
  useEffect(() => {
    const checkToken = async () => {
      await refreshAccessToken();
      if (!sessionStorage.getItem('access-token')) {
        logout();
      }
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeadBar />
      <main className="mainPart flex flex-col items-center justify-between">
        <Posts />
      </main>
      <Navigation />
    </>
  );
}
