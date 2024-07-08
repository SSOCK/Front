'use client';

import { useEffect, useState, useRef, MouseEvent } from 'react';
import { Club, HeadBar } from '@components';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import Check from '@/public/icons/check.svg';
import Pin from '@/public/icons/pin.svg';
import Search from '@/public/icons/search.svg';

export default function Home() {
  const [people, setPeople] = useState(false);
  const [close, setClose] = useState(false);
  const [participate, setParticipate] = useState(false);
  const [recent, setRecent] = useState(false);
  const peopleRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const participateRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      <div className="w-full flex flex-col">
        <div className="flex justify-center flex-col mx-auto pt-20 pb-12">
          <div className="text-3xl font-bold pb-2 w-fit mx-auto">클럽</div>
          <div className="text-gray-500">
            클럽에 가입하여 함께 달리는 재미를 느껴보세요!
          </div>
        </div>

        <div className="flex justify-center min-w-fit mx-auto gap-2 items-center p-4 border border-zinc-400 rounded-md bg-white md:gap-4">
          <div className="flex grow w-full">
            <div className="border-r flex items-center basis-1/2">
              <Search className="w-5 fill-slate-400 mr-1" />
              <Input
                placeholder="검색어 키워드를 입력해주세요"
                className="max-w-24 border-0 overflow-hidden text-ellipsis whitespace-nowrap md:min-w-72"
              />
            </div>
            <div className="flex items-center basis-1/2">
              <Pin className="w-5 h-5 ml-2 mr-1 fill-slate-400" />
              <Input
                placeholder="위치를 입력해주세요"
                className="max-w-24 border-0 overflow-hidden text-ellipsis whitespace-nowrap md:min-w-72"
              />
            </div>
          </div>
          <Button className="h-8 px-2">검색</Button>
        </div>
      </div>

      <div className="m-auto w-full pb-20 lg:w-4/5">
        <div className="flex justify-between pt-10 mb-5 w-fit">
          <div ref={peopleRef} className="sortclubchallenge" onClick={sort}>
            {people ? (
              <span className="text-blue-600">
                <Check className="inline w-5" /> 인원많은순
              </span>
            ) : (
              '인원많은순'
            )}
          </div>
          <div ref={closeRef} className="sortclubchallenge" onClick={sort}>
            {close ? (
              <span className="text-blue-600">
                <Check className="inline w-5" /> 가까운순
              </span>
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
              <span className="text-blue-600">
                <Check className="inline w-5" /> 참여율순
              </span>
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
              <span className="text-blue-600">
                <Check className="inline w-5" /> 최신순
              </span>
            ) : (
              '최신순'
            )}
          </div>
        </div>

        <div className="clubchallenge">
          <Club
            title={'클럽명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            loc={'위치'}
            participate={0}
          />
          <Club
            title={'클럽명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            loc={'위치'}
            participate={0}
          />
          <Club
            title={'클럽명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            loc={'위치'}
            participate={0}
          />
          <Club
            title={'클럽명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            loc={'위치'}
            participate={0}
          />
          <Club
            title={'클럽명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            loc={'위치'}
            participate={0}
          />
          <Club
            title={'클럽명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            loc={'위치'}
            participate={0}
          />
          <Club
            title={'클럽명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            loc={'위치'}
            participate={0}
          />
          <Club
            title={'클럽명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            loc={'위치'}
            participate={0}
          />
        </div>
      </div>
    </>
  );
}
