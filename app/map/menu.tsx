'use client';

import { useState } from 'react';
import { Button } from '@components/ui/button';
import AddCourse from './addCourse';
import FindCourse from './findCourse';
import HomeCourse from './homeCourse';
import MenuNavigations from './menuNavigation';
import MyCourse from './myCourse';
import { myMap } from './page';

interface MenuProps {
  mapRef: React.MutableRefObject<myMap | undefined>;
}

export type MenuInfo = {
  name: string;
  component: JSX.Element;
};

const MAP_NAV_LIST = [
  { name: '홈', component: <HomeCourse /> },
  { name: '찾기', component: <FindCourse /> },
  { name: '추가', component: <AddCourse /> },
  { name: '내코스', component: <MyCourse /> },
];

export default function Menu({ mapRef }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nowMenu, setNowMenu] = useState<number>(0);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  console.log(nowMenu);
  return (
    <div
      className={`flex absolute z-50 w-96 top-0 h-full ease-in-out transition-transform duration-300 ${isOpen && '-translate-x-full'}`}
    >
      {/* 아래가 메인 화면 */}
      <div className="bg-white w-96 h-full border-r flex flex-col">
        <div className="flex-grow bg-slate-300">
          {MAP_NAV_LIST[nowMenu].component}
        </div>
        <MenuNavigations
          menuList={MAP_NAV_LIST}
          nowMenu={nowMenu}
          setNowMenu={setNowMenu}
        />
      </div>

      <button
        className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 bg-white h-12 border border-l-0 border-primary p-1 rounded-r font-bold text-primary"
        onClick={toggleIsOpen}
      >
        {isOpen ? `>` : '<'}
      </button>
    </div>
  );
}
