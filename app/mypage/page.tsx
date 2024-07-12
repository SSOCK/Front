'use client';

import { useEffect, useState, useRef, MouseEvent } from 'react';
import { HeadBar } from '@components';
import Activity from './activity';
import Challenge from './challenge';
import Club from './club';
import Course from './course';
import Profile from './profile';

export default function Home() {
  const [profile, setProfile] = useState(false);
  const [activity, setActivity] = useState(false);
  const [course, setCourse] = useState(false);
  const [club, setClub] = useState(false);
  const [challenge, setChallenge] = useState(false);
  const [feed, setFeed] = useState(false);
  const [setting, setSetting] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const courseRef = useRef<HTMLDivElement>(null);
  const clubRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const settingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reset();
    setProfile(true);
  }, []);

  const reset = () => {
    setProfile(false);
    setActivity(false);
    setCourse(false);
    setClub(false);
    setChallenge(false);
    setFeed(false);
    setSetting(false);
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
      <div className={border ? 'flex justify-between' : 'border-b'}>
        <div
          ref={profileRef}
          id="item"
          className={base + (profile ? click : '')}
        >
          프로필
        </div>
        {border ? <div className="border" /> : null}
        <div
          ref={activityRef}
          id="item"
          className={base + (activity ? click : '')}
        >
          활동
        </div>
        {border ? <div className="border" /> : null}
        <div ref={courseRef} id="item" className={base + (course ? click : '')}>
          코스
        </div>
        {border ? <div className="border" /> : null}
        <div ref={clubRef} id="item" className={base + (club ? click : '')}>
          클럽
        </div>
        {border ? <div className="border" /> : null}
        <div
          ref={challengeRef}
          id="item"
          className={base + (challenge ? click : '')}
        >
          챌린지
        </div>
        {border ? <div className="border" /> : null}
        <div ref={feedRef} id="item" className={base + (feed ? click : '')}>
          피드
        </div>
        {border ? <div className="border" /> : null}
        <div
          ref={settingRef}
          id="item"
          className={base + (setting ? click : '')}
        >
          설정
        </div>
      </div>
    );
  };

  const change = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.id !== 'item') return;

    reset();
    switch (target.innerText) {
      case '프로필':
        setProfile(true);
        break;
      case '활동':
        setActivity(true);
        break;
      case '코스':
        setCourse(true);
        break;
      case '클럽':
        setClub(true);
        break;
      case '챌린지':
        setChallenge(true);
        break;
      case '피드':
        setFeed(true);
        break;
      case '설정':
        setSetting(true);
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
          <div className="font-bold pb-2">마이페이지</div>
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
          {profile ? <Profile /> : null}
          {activity ? <Activity /> : null}
          {course ? <Course /> : null}
          {club ? <Club /> : null}
          {challenge ? <Challenge /> : null}
        </div>
      </div>
    </>
  );
}
