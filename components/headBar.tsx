'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const nowPath = usePathname().split('/')[1];
  const img = 'https://avatars.githubusercontent.com/u/96722691?v=5';

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
        <Add className="w-6 fill-primary cursor-pointer" />
        <Bell className="w-5 cursor-pointer" />
        <img
          className="w-8 h-8 rounded-full border bg-slate-400 cursor-pointer"
          src={img}
          alt=""
        />
      </div>
    </div>
  );
}
