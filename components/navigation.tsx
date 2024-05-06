'use client';

import Link from 'next/link';
import { Button } from './ui/button';

const items: { title: string; href: string; icons: string }[] = [
  { title: 'Home', href: '/', icons: '' },
  { title: 'Map', href: '/map', icons: '' },
  { title: 'Record', href: '/record', icons: '' },
  { title: 'MyPage', href: '/mypage', icons: '' },
];

export default function Home() {
  return (
    <div className="fixed bottom-0 bg-primary w-screen h-20 z-50">
      <ul className="flex flex-row justify-around h-full items-center">
        {items.map((item) => {
          return (
            <Button
              key={item.href}
              variant="ghost"
              className="flex-auto h-full rounded-none text-primary-foreground"
              asChild
            >
              <Link href={item.href}>{item.title}</Link>
            </Button>
          );
        })}
      </ul>
    </div>
  );
}
