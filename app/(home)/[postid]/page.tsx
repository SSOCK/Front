'use client';

import { useEffect } from 'react';
import { HeadBar, Navigation, Post } from '@components';
import useLogout from '@hooks/useLogout';

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
      <Navigation />
    </>
  );
}
