'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Add from '@/public/icons/add.svg';
import Bell from '@/public/icons/bell.svg';
import { Button } from './ui/button';

const paths = [
  { path: '', category: '홈' },
  { path: 'map', category: '코스' },
  { path: 'club', category: '클럽' },
  { path: 'challenge', category: '챌린지' },
  { path: 'feed', category: '피드' },
];

export default function HeadBar() {
  const router = useRouter();

  const [add, setAdd] = useState(false);
  const [bell, setBell] = useState(false);
  const [alarm, setAlarm] = useState<Array<ReactNode>>([]);
  const addRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  const nowPath = usePathname().split('/')[1];
  const img = 'https://avatars.githubusercontent.com/u/96722691?v=5';
  const elemClass = 'p-2 bg-white cursor-pointer hover:bg-border';
  const alarmData = [
    '알람 1입니다.',
    '알람 2입니다.',
    '알람 3입니다.',
    '알람 4입니다.',
  ];

  useEffect(() => {
    setAlarm(
      alarmData.map((item, index) => (
        <div key={index} className={elemClass}>
          {item}
        </div>
      ))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-between w-full h-16 items-center p-2 z-50 border-b xl:w-5/6 xl:mx-auto xl:p-4">
      <div>
        <Button variant="link" className="text-xl font-bold hidden sm:inline">
          RunningMate
        </Button>
        {paths.map(({ path, category }) => (
          <Button
            key={category}
            variant="link"
            className={cn([
              'font-bold p-2 sm:p-4',
              nowPath !== path && 'text-black',
            ])}
          >
            <Link href={`/${path}`}>{category}</Link>
          </Button>
        ))}
      </div>

      <div className="flex gap-3 sm:gap-5 sm:pr-4">
        <div className="relative w-6 flex items-center">
          <Add
            className="w-full fill-primary cursor-pointer relative"
            onClick={() => {
              setBell(false);
              bellRef.current!.style.display = 'none';
              setAdd(!add);
              addRef.current!.style.display = add ? 'none' : 'block';
            }}
          />
          <div
            ref={addRef}
            className="hidden w-40 absolute top-9 right-0 border"
          >
            <div className={elemClass}>활동 기록</div>
            <div className={elemClass}>코스 등록</div>
            <div className={elemClass}>게시글 작성</div>
          </div>
        </div>

        <div className="relative w-5 flex items-center">
          <Bell
            className="w-full cursor-pointer hover:fill-primary"
            onClick={() => {
              setAdd(false);
              addRef.current!.style.display = 'none';
              setBell(!bell);
              bellRef.current!.style.display = bell ? 'none' : 'block';
            }}
          />
          <div
            ref={bellRef}
            className="hidden w-56 absolute top-9 right-0 border"
          >
            {alarm}
          </div>
        </div>

        <img
          className="w-8 h-8 rounded-full border bg-slate-400 cursor-pointer"
          src={img}
          alt=""
          onClick={() => router.push('/mypage')}
        />
      </div>
    </div>
  );
}
