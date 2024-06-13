'use client';

import { useEffect } from 'react';
import { HeadBar, Navigation } from '@components';
import { refreshAccessToken } from '@utils/fetch';
import logout from '@utils/logout';
import MyCalender from '@components/myCalender';
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
      <div className="flex items-center w-full ">
        <div className="flex flex-col w-full overflow-scroll">
          <Posts />
        </div>
        <div className="flex flex-col h-full p-5 pl-0">
          <MyCalender />
        </div>
      </div>
    </>
  );
}
