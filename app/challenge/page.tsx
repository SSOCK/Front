'use client';

import { HeadBar } from '@components';
import { Button } from '@components/ui/button';
import Challenge from './challenge';
import Club from './club';

export default function Home() {
  return (
    <>
      <HeadBar />
      <div className="w-full bg-gray-200 flex flex-col">
        <div className="flex justify-center text-lg font-bold pt-10 pb-6">
          이달의 인기 챌린지
        </div>

        <div className="w-3/5 flex justify-center m-auto pb-10">
          <div className="bg-white p-8 border-2 border-zinc-300 basis-1/3">
            <div className="font-bold text-lg">챌린지명</div>
            <div className="">간단소개(ex. 매일 5km 달리기)</div>
            <div className="">기간</div>
            <div className="">00명 참여중</div>
            <Button className="w-full mt-10">참여하기</Button>
          </div>

          <div className="bg p-8 bg-zinc-300 basis-2/3">Right</div>
        </div>
      </div>

      <div className="w-3/5 mx-auto pt-5">
        <div className="text-md font-bold cursor-pointer">인기 클럽</div>
        <div className="grid grid-cols-4 gap-2">
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

        <div className="text-md font-bold cursor-pointer">
          현재 모집 중인 챌린지
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Challenge
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
            title={'챌린지명'}
            img={'https://avatars.githubusercontent.com/u/96722691?v=5'}
            introduce={'간단소개'}
            period={'기간'}
            participate={0}
          />
          <Challenge
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
