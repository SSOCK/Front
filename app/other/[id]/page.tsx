'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef, MouseEvent } from 'react';
import { HeadBar, Activity, Feed } from '@components';

export default function Home() {
  const { id } = useParams();
  const [activity, setActivity] = useState(false);
  const [feed, setFeed] = useState(false);
  const activityRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reset();
    setActivity(true);
  }, []);

  const reset = () => {
    setActivity(false);
    setFeed(false);
  };

  const Menu = ({
    base,
    click,
    border,
  }: {
    base: string;
    click: string;
    border: boolean;
  }) => {
    return (
      <div className={border ? 'flex justify-evenly' : 'border-b'}>
        <div
          ref={activityRef}
          id="item"
          className={base + (activity ? click : '')}
        >
          활동
        </div>
        {border ? <div className="border m-0" /> : null}
        <div ref={feedRef} id="item" className={base + (feed ? click : '')}>
          피드
        </div>
      </div>
    );
  };

  const change = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.id !== 'item') return;

    reset();
    switch (target.innerText) {
      case '활동':
        setActivity(true);
        break;
      case '피드':
        setFeed(true);
        break;
    }
  };

  return (
    <>
      <HeadBar />
      <div className="w-full max-w-7xl pb-20 sm:flex xl:w-5/6 xl:mx-auto">
        <div
          className="hidden pt-10 pb-5 px-3 sm:basis-1/6 sm:block"
          onClick={change}
        >
          <div className="font-bold pb-2">다른사용자</div>
          <Menu
            base="cursor-pointer border border-b-0 p-2 hover:bg-primary hover:text-white"
            click=" bg-primary border-primary text-white"
            border={false}
          />
        </div>
        <div className="p-2 sm:hidden">
          <div className="font-bold pb-2">마이페이지</div>
          <div className="pb-2 border-b" onClick={change}>
            <Menu
              base="cursor-pointer hover:text-primary"
              click=" text-primary"
              border={true}
            />
          </div>
        </div>

        <div className="p-5 sm:basis-5/6 sm:pt-10 lg:ml-5">
          {activity ? <Activity userid={Number(id)} /> : null}
          {feed ? <Feed userid={Number(id)} /> : null}
        </div>
      </div>
    </>
  );
}
