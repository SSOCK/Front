import { useState, useRef, useEffect } from 'react';
import Add from '@/public/icons/add.svg';
import Bell from '@/public/icons/bell.svg';
import Link from 'next/link';
import { fetchWithRetry } from '@utils/fetch';
import { hasCookie } from 'cookies-next';
import { url } from 'inspector';
import path from 'path';

interface ProfileData {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
  username: string;
}

export default function HeaderProfile() {
  const [add, setAdd] = useState(false);
  const [bell, setBell] = useState(false);
  const [alarm, setAlarm] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();
  const addRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  const img = 'https://avatars.githubusercontent.com/u/96722691?v=5';
  const elemClass = 'p-2 bg-white cursor-pointer hover:bg-border';
  const alarmData = [
    '알람 1입니다.',
    '알람 2입니다.',
    '알람 3입니다.',
    '알람 4입니다.',
  ];

  useEffect(() => {
    async function aa() {
      // refresh토큰 있는지 검사해서 없으면
      // console.log(hasCookie('refresh-token'));
      // console.log(hasCookie('refresh-token', { path: '/api/auth/refresh' }));
      // console.log(hasCookie('test', { path: '/test' }));
      const res = await fetchWithRetry('/api/member/profile/test', {
        method: 'get',
      });
      const data = (await res?.json()) as ProfileData;
      console.log(data);
      //여기서 알람받아오는 api
      setProfileData(data);
      setAlarm(alarmData);
    }
    aa();
  }, []);

  return (
    <>
      {profileData ? (
        <div className="flex gap-3 sm:gap-5 sm:pr-4">
          <details
            className="relative content-center"
            onBlur={(e) => {
              e.currentTarget.open = false;
            }}
          >
            <summary className="text-[0]">
              <Add className="w-6 fill-primary cursor-pointer relative peer" />
            </summary>
            <div className=" w-40 absolute top-9 right-0 border ">
              <div className={elemClass}>활동 기록</div>
              <div className={elemClass}>코스 등록</div>
              <div className={elemClass}>게시글 작성</div>
            </div>
          </details>
          <details
            className="relative content-center"
            onBlur={(e) => {
              e.currentTarget.open = false;
            }}
          >
            <summary className="text-[0]">
              <Bell className="w-6 cursor-pointer hover:fill-primary" />
            </summary>
            <div className="w-56 absolute top-9 right-0 border peer-checked:block">
              {alarmData.map((item, index) => (
                <div key={index} className={elemClass}>
                  {item}
                </div>
              ))}
            </div>
          </details>

          <Link href={'/mypage'}>
            <img
              className="w-8 h-8 rounded-full border bg-slate-400 cursor-pointer"
              src={img}
              alt=""
            />
          </Link>
        </div>
      ) : (
        <Link href={'/signin'}>
          <h1>로그인 먼저 하세요</h1>
        </Link>
      )}
    </>
  );
}
