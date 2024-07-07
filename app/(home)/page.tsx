'use client';

import { useState } from 'react';
import { Challenge, Club, HeadBar } from '@components';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';

export default function Home() {
  const [position, setPosition] = useState<string>('클럽');

  return (
    <>
      <HeadBar />
      <div className="w-full bg-gray-200 flex flex-col">
        <div className="flex justify-center flex-col mx-auto pt-20 pb-16">
          <div className="text-3xl font-bold pb-2 text-primary">
            (예시) 함께 달리는 즐거움!
          </div>
          <div className="text-gray-500">
            공식 클럽 또는 경고 배너 또는 문구 넣기
          </div>
        </div>

        <div className="min-w-fit flex justify-center mx-auto pb-10">
          <div className="flex justify-between gap-2 items-center w-full p-4 border border-zinc-400 rounded-md bg-white lg:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="p-0 h-8 border-0 text-primary font-bold"
                >
                  {position} ↓
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="클럽">
                    클럽
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="챌린지">
                    챌린지
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex grow">
              <div className="border-r flex items-center basis-1/2">
                <div>🔍</div>
                <Input
                  placeholder="검색어 키워드를 입력해주세요"
                  className="max-w-24 border-0 overflow-hidden text-ellipsis whitespace-nowrap md:min-w-72"
                />
              </div>
              <div className="flex items-center basis-1/2">
                <div className="pl-2">📍</div>
                <Input
                  placeholder="위치를 입력해주세요"
                  className="max-w-24 border-0 overflow-hidden text-ellipsis whitespace-nowrap md:min-w-72"
                />
              </div>
            </div>
            <Button className="h-8 px-2">검색</Button>
          </div>
        </div>
      </div>

      <div className="pt-5 m-auto w-full lg:w-4/5">
        <div className="pl-2 text-md font-bold cursor-pointer">인기 클럽</div>
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
        </div>

        <div className="pl-2 pt-10 text-md font-bold cursor-pointer">
          현재 모집 중인 챌린지
        </div>
        <div className="clubchallenge mb-20">
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
