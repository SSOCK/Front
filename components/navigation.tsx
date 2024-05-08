'use client';

import Link from 'next/link';
import { Button } from './ui/button';

const items: { title: string; href: string; icons: string }[] = [
  { title: 'Home', href: '/', icons: '' },
  { title: 'Map', href: '/map', icons: '' },
  { title: 'Record', href: '/record', icons: '' },
  { title: 'MyPage', href: '/mypage', icons: '' },
];

export default function Navigation() {
  return (
    <div className="bg-primary w-full">
      <ul className="flex flex-row justify-around h-20 items-center">
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
