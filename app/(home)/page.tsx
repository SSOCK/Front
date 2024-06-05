'use client';

import { useEffect } from 'react';
import { HeadBar, Navigation, Post } from '@components';
import useLogout from '@hooks/useLogout';
import { refreshAccessToken } from '@/utils/fetch';
import Posts from './posts';

export default function Home() {
  const logout = useLogout();

  useEffect(() => {
    const aa = async () => {
      await refreshAccessToken();
      console.log(sessionStorage.getItem('access-token'));

      if (!sessionStorage.getItem('access-token')) {
        logout();
      }
    };
    aa();

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
