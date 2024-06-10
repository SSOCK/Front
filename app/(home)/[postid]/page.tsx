'use client';

import { useEffect } from 'react';
import { HeadBar, Navigation } from '@components';
import logout from '@utils/logout';

export default function Home() {
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
