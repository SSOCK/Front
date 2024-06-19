'use client';

import { useState } from 'react';
import Find from '@/public/icons/find.svg';
import Pencil from '@/public/icons/pencil.svg';
import Save from '@/public/icons/save.svg';
import FindCourse from './(findMenu)/findCourse';
import AddCourse from './addCourse';
import MenuNavigations from './menuNavigation';
import MyCourse from './myCourse';
import { MyMap } from './page';

interface MenuProps {
  mapRef: React.MutableRefObject<MyMap | undefined>;
}

export type MenuInfo = {
  name: string;
  component: JSX.Element;
  svg: JSX.Element;
};

export default function Menu({ mapRef }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nowMenu, setNowMenu] = useState<number>(0);
  const MAP_NAV_LIST = [
    { name: '검색', component: <FindCourse mapRef={mapRef} />, svg: <Find /> },
    { name: '저장', component: <MyCourse />, svg: <Save /> },
    { name: '추가', component: <AddCourse mapRef={mapRef} />, svg: <Pencil /> },
  ];
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  console.log(nowMenu);
  return (
    <div
      className={`flex absolute z-50 top-0 h-full ease-in-out transition-transform duration-300 ${isOpen && '-translate-x-full'} shadow-xl`}
    >
      <MenuNavigations
        menuList={MAP_NAV_LIST}
        nowMenu={nowMenu}
        setNowMenu={setNowMenu}
      />

      {/* 아래가 메인 화면 */}

      <div className="bg-white w-[23rem] h-full border-l flex flex-row border-gray-200">
        <div className="flex-grow">{MAP_NAV_LIST[nowMenu].component}</div>
      </div>

      <button
        className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 bg-white h-12 border border-l-0 p-1 rounded-r font-bold "
        onClick={toggleIsOpen}
      >
        {isOpen ? `>` : '<'}
      </button>
    </div>
  );
}
