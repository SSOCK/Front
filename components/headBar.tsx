'use client';

import { usePathname } from 'next/navigation';
import logout from '@utils/logout';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const paths = [
  { path: '', category: '피드' },
  { path: 'map', category: '코스' },
  { path: 'club', category: '클럽/챌린지' },
];

export default function HeadBar() {
  const nowPath = usePathname().split('/')[1];
  return (
    <div className="flex justify-between w-full h-16 items-center p-4 z-50 border-b">
      <div>
        <Button variant="link" className="text-xl font-bold ">
          RunningMate
        </Button>
        {paths.map(({ path, category }) => (
          <Button
            key={category}
            variant="link"
            className={cn(['font-bold', nowPath !== path && 'text-black'])}
          >
            {category}
          </Button>
        ))}
      </div>

      <div></div>
    </div>
  );
}
