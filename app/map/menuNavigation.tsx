'use client';

import React, { Dispatch, SetStateAction } from 'react';
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
    <div className="h-full w-16 bg-white flex flex-col items-center">
      {menuList.map(({ name, svg }, index) => (
        <button
          key={index}
          className={`text-xs rounded-none h-20  ${index === nowMenu && 'text-primary font-bold'} flex flex-col items-center justify-center gap-1`}
          onClick={() => setNowMenu(index)}
        >
          {name === '추가' && <div className="bg-gray-200 w-2/3 h-[1px]"></div>}
          {React.cloneElement(svg, {
            className: `size-5 ${index === nowMenu && 'stroke-primary fill-primary'}`,
          })}
          <h2 className="font-bold">{name}</h2>
        </button>
      ))}
    </div>
  );
}
