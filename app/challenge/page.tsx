'use client';

import { useEffect, useState, useRef, MouseEvent } from 'react';
import { Challenge, HeadBar } from '@components';
import { Button } from '@stories/Button';

export default function Home() {
  const [month, setMonth] = useState(6);
  const [people, setPeople] = useState(false);
  const [close, setClose] = useState(false);
  const [participate, setParticipate] = useState(false);
  const [recent, setRecent] = useState(false);
  const peopleRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const participateRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
    setPeople(true);
  }, []);

  const reset = () => {
    setPeople(false);
    setClose(false);
    setParticipate(false);
    setRecent(false);
  };

  const sort = (event: MouseEvent<HTMLDivElement>) => {
    reset();
    const target = event.target as HTMLElement;
    switch (target.innerText) {
      case '인원많은순':
        setPeople(true);
        break;
      case '가까운순':
        setClose(true);
        break;
      case '참여율순':
        setParticipate(true);
        break;
      case '최신순':
        setRecent(true);
        break;
    }
  };

  return (
    <>
      <HeadBar />
      <div className="w-full bg-gray-200 flex flex-col xl:w-5/6 xl:mx-auto">
        <div className="flex justify-center text-lg font-bold pt-10 pb-6">
          이달의 인기 챌린지
        </div>

        <div className="flex justify-center m-auto pb-10 w-4/5">
          <div className="bg-white p-8 border-2 border-zinc-300 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="font-bold text-lg">챌린지명</div>
            <div className="">간단소개(ex. 매일 5km 달리기)</div>
            <div className="">기간</div>
            <div className="">00명 참여중</div>
            <Button label="참여하기" className="w-full mt-10" />
          </div>

          <div className="bg p-8 bg-zinc-300 hidden basis-1/2 sm:block lg:basis-2/3">
            Right
          </div>
        </div>
      </div>

      <div className="m-auto w-full lg:w-4/5">
        <div className="flex flex-col justify-between pt-10 mb-5 sm:flex-row">
          <div className="pl-2 cursor-pointer">{month}월 △</div>
          <div className="flex ml-auto sm:ml-0">
            <div ref={peopleRef} className="sortclubchallenge" onClick={sort}>
              {people ? (
                <span className="text-blue-600">✔️ 인원많은순</span>
              ) : (
                '인원많은순'
              )}
            </div>
            <div ref={closeRef} className="sortclubchallenge" onClick={sort}>
              {close ? (
                <span className="text-blue-600">✔️ 가까운순</span>
              ) : (
                '가까운순'
              )}
            </div>
            <div
              ref={participateRef}
              className="sortclubchallenge"
              onClick={sort}
            >
              {participate ? (
                <span className="text-blue-600">✔️ 참여율순</span>
              ) : (
                '참여율순'
              )}
            </div>
            <div
              ref={recentRef}
              className="sortclubchallenge border-r-0"
              onClick={sort}
            >
              {recent ? (
                <span className="text-blue-600">✔️ 최신순</span>
              ) : (
                '최신순'
              )}
            </div>
          </div>
        </div>

        <div className="clubchallenge pb-20">
          <Challenge
            id={123}
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            id={123}
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            id={123}
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            id={123}
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            id={123}
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            id={123}
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            id={123}
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            id={123}
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
        </div>
      </div>
    </>
  );
}
