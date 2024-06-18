'use client';

import { Dispatch, SetStateAction } from 'react';
import { MenuInfo } from './menu';

interface MenuNavProps {
  menuList: MenuInfo[];
  nowMenu: number;
  setNowMenu: Dispatch<SetStateAction<number>>;
}

export default function MenuNavigations({
  menuList,
  nowMenu,
  setNowMenu,
}: MenuNavProps) {
  return (
    <div className="w-full h-14 bg-slate-100 flex border border-r-0 ">
      {menuList.map(({ name }, index) => (
        <button
          key={index}
          className={`rounded-none flex-grow h-full basis-0 ${index !== menuList.length && `border-r`} ${index === nowMenu && 'text-primary font-bold'}`}
          onClick={() => setNowMenu(index)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
