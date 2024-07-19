import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useSetProfile from '@hooks/useSetProfile';
import logout from '@utils/logout';
import { ProfileRecoil } from '@atoms';
import Add from '@/public/icons/add.svg';
import Bell from '@/public/icons/bell.svg';

export default function HeaderProfile() {
  const none = 0;
  const plus = 1;
  const bell = 2;
  const route = 3;

  const userProfile = useRecoilValue(ProfileRecoil);
  const setProfile = useSetProfile();

  const [opendMenu, setOpenMenu] = useState<Number>(none);
  const [alarm, setAlarm] = useState<string[]>([]);

  const elemClass = 'p-2 bg-white cursor-pointer hover:bg-border';
  const alarmData = [
    '알람 1입니다.',
    '알람 2입니다.',
    '알람 3입니다.',
    '알람 4입니다.',
  ];

  useEffect(() => {
    if (userProfile.id === -1) setProfile();
    setAlarm(alarmData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userProfile.id !== -1 ? (
        <div className="flex gap-3 sm:gap-5 sm:pr-4">
          <div className="relative content-center">
            <div onClick={() => setOpenMenu(opendMenu === plus ? none : plus)}>
              <Add className="w-6 fill-primary cursor-pointer relative peer" />
            </div>
            {opendMenu === plus && (
              <div className=" w-40 absolute top-9 right-0 border z-50">
                <div className={elemClass}>활동 기록</div>
                <div className={elemClass}>코스 등록</div>
                <Link href={'/writepost'}>
                  <div className={elemClass}>게시글 작성</div>
                </Link>
              </div>
            )}
          </div>
          <div className="relative content-center">
            <div onClick={() => setOpenMenu(opendMenu === bell ? none : bell)}>
              <Bell className="w-6 cursor-pointer hover:fill-primary" />
            </div>

            {opendMenu === bell && (
              <div className="w-56 absolute top-9 right-0 border z-50 peer-checked:block">
                {alarm.map((item, index) => (
                  <div key={index} className={elemClass}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-8 h-8 relative">
            <img
              className="w-full h-full rounded-full border bg-slate-400 cursor-pointer"
              src={userProfile.profilePicture}
              alt=""
              onClick={() => setOpenMenu(opendMenu === route ? none : route)}
            />
            {opendMenu === route && (
              <div className="w-36 absolute top-9 right-0 border z-50">
                <Link href={'/mypage'}>
                  <div className={elemClass}>마이페이지</div>
                </Link>
                <div className={elemClass} onClick={() => logout('/')}>
                  로그아웃
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link href={'/signin'}>
          <h1>로그인 하세요</h1>
        </Link>
      )}
    </>
  );
}
