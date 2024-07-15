import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchWithRetry, refreshAccessToken } from '@utils/fetch';
import { getAccessTokenPayload } from '@utils/token';
import Add from '@/public/icons/add.svg';
import Bell from '@/public/icons/bell.svg';

interface ProfileData {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
  username: string;
}

export default function HeaderProfile() {
  const [opendMenu, setOpenMenu] = useState<Number>(0);
  const [alarm, setAlarm] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();

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
      try {
        await refreshAccessToken();
        //토큰 발급 성공 (로그인 되어있거나, refreshtoken이 유효할때) 이제 access-token의 payload를 읽을 수 있음
        const payload = getAccessTokenPayload();
        const username = payload.username;

        const res = await fetchWithRetry(`/api/member/profile/${username}`, {
          method: 'get',
        });
        if (!res?.ok) {
          return;
        }
        const data = (await res?.json()) as ProfileData;
        //여기서 알람받아오는 api
        setProfileData(data);
        setAlarm(alarmData);
      } catch (error) {
        console.error(error);
      }
    }
    aa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {profileData ? (
        <div className="flex gap-3 sm:gap-5 sm:pr-4">
          <div className="relative content-center">
            <div onClick={() => setOpenMenu(opendMenu === 1 ? 0 : 1)}>
              <Add className="w-6 fill-primary cursor-pointer relative peer" />
            </div>
            {opendMenu === 1 && (
              <div className=" w-40 absolute top-9 right-0 border ">
                <div className={elemClass}>활동 기록</div>
                <div className={elemClass}>코스 등록</div>
                <Link href={'/writepost'}>
                  <div className={elemClass}>게시글 작성</div>
                </Link>
              </div>
            )}
          </div>
          <div className="relative content-center">
            <div onClick={() => setOpenMenu(opendMenu === 2 ? 0 : 2)}>
              <Bell className="w-6 cursor-pointer hover:fill-primary" />
            </div>

            {opendMenu === 2 && (
              <div className="w-56 absolute top-9 right-0 border peer-checked:block">
                {alarm.map((item, index) => (
                  <div key={index} className={elemClass}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

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
          <h1>로그인 하세요</h1>
        </Link>
      )}
    </>
  );
}
