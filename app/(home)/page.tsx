'use client';

import { useEffect } from 'react';
import { HeadBar, Navigation } from '@components';
import useLogout from '@hooks/useLogout';
import { refreshAccessToken } from '@/utils/fetch';
import Posts from './posts';

export default function Home() {
  const logout = useLogout();

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
