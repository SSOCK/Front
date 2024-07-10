'use client';

import { useEffect, useState, useRef, MouseEvent } from 'react';
import { HeadBar } from '@components';

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

  const change = (event: MouseEvent<HTMLDivElement>) => {
    reset();
    const target = event.target as HTMLElement;
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
      <div className="w-full sm:flex xl:w-5/6 xl:mx-auto">
        <div className="hidden border sm:basis-1/6 sm:block">마이페이지</div>
        <div className="p-2 sm:hidden">
          <div className="font-bold pb-2">마이페이지</div>
          <div className="flex justify-between" onClick={change}>
            <div
              ref={profileRef}
              className={
                'cursor-pointer hover:text-primary' +
                (profile ? ' text-primary' : '')
              }
            >
              프로필
            </div>
            <div className="border" />
            <div
              ref={activityRef}
              className={
                'cursor-pointer hover:text-primary' +
                (activity ? ' text-primary' : '')
              }
            >
              활동
            </div>
            <div className="border" />
            <div
              ref={courseRef}
              className={
                'cursor-pointer hover:text-primary' +
                (course ? ' text-primary' : '')
              }
            >
              코스
            </div>
            <div className="border" />
            <div
              ref={clubRef}
              className={
                'cursor-pointer hover:text-primary' +
                (club ? ' text-primary' : '')
              }
            >
              클럽
            </div>
            <div className="border" />
            <div
              ref={challengeRef}
              className={
                'cursor-pointer hover:text-primary' +
                (challenge ? ' text-primary' : '')
              }
            >
              챌린지
            </div>
            <div className="border" />
            <div
              ref={feedRef}
              className={
                'cursor-pointer hover:text-primary' +
                (feed ? ' text-primary' : '')
              }
            >
              피드
            </div>
            <div className="border" />
            <div
              ref={settingRef}
              className={
                'cursor-pointer hover:text-primary' +
                (setting ? ' text-primary' : '')
              }
            >
              설정
            </div>
          </div>
        </div>

        <div className="border p-5 sm:basis-5/6">프로필</div>
      </div>
    </>
  );
}
