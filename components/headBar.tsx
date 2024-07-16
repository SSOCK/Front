import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import HeaderProfile from './headerProfile';
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
  return (
    <div className="border-b">
      <div className="flex justify-between w-full h-16 items-center p-2 z-50 xl:w-5/6 xl:mx-auto xl:p-4">
        <div>
          <Link href={'/'}>
            <Button
              variant="link"
              className="text-xl font-bold hidden sm:inline"
            >
              RunningMate
            </Button>
          </Link>
          {paths.map(({ path, category }) => (
            <Link href={`/${path}`} key={category}>
              <Button
                variant="link"
                className={cn([
                  'font-bold p-2 sm:p-4',
                  nowPath !== path && 'text-black',
                ])}
              >
                {category}
              </Button>
            </Link>
          ))}
        </div>
        <HeaderProfile />
      </div>
    </div>
  );
}
