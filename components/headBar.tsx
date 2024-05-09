'use client';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export default function HeadBar() {
  const path = usePathname().split('/')[1];
  const title = path === '' ? 'home' : path;
  return (
    <div className="flex justify-between w-full h-16 items-center p-4 bg-primary z-50">
      <Button className="hover:bg-slate-500">{title}</Button>
      <div>
        <Button className="hover:bg-slate-500">chat</Button>
        <Button className="hover:bg-slate-500">search</Button>
        <Button className="hover:bg-slate-500">notice</Button>
      </div>
    </div>
  );
}
