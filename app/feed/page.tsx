'use client';

import { useEffect } from 'react';
import { HeadBar, MyCalender } from '@components';
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
      <div className="flex items-center w-full ">
        <div className="flex flex-col w-full overflow-scroll hidden-scrollbar">
          <Posts />
        </div>
        <div className="flex-col h-full p-5 pl-0 hidden sm:flex">
          <MyCalender />
        </div>
      </div>
    </>
  );
}
