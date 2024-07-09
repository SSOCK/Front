'use client';

import { useRef, useEffect } from 'react';
import { HeadBar } from '@components';
import { Button } from '@components/ui/button';
import Calendar from '@/public/icons/calendar.svg';
import Text from '@/public/icons/text.svg';

export default function Home() {
  const ddayRef = useRef<HTMLDivElement>(null);

  const data = {
    img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
    title: '6월 <100K 달리기 챌린지>',
    startDate: '2024-06-05T00:57:09.528969',
    endDate: '2024-07-15T00:57:09.528969',
    description: '6월 한 달 동안 총 100km를 달리는 챌린지입니다.',
    now: 0,
    target: 100,
    participation: 1000,
    join: true,
  };

  const startDate = data.startDate.split('-');
  const endDate = data.endDate.split('-');
  const startDay = startDate[2].substring(0, 2);
  const endDay = endDate[2].substring(0, 2);

  const ChallengeTop = () => {
    return (
      <div className="w-full h-44 lg:h-52">
        <div className="flex items-center mt-3">
          <Calendar className="w-5 inline mr-2" />
          {startDate[0]}.{startDate[1]}.{startDay} - {endDate[0]}.{endDate[1]}.
          {endDay}
        </div>
        <div className="flex items-center mt-5 overflow-hidden max-h-24 lg:max-h-36 ">
          <Text className="w-5 inline mr-2 flex-shrink-0 mb-auto" />
          <div className="overflow-hidden text-ellipsis line-clamp-4 lg:line-clamp-6">
            {data.description}
          </div>
        </div>
      </div>
    );
  };

  const ButtonGroup = () => {
    return (
      <>
        {data.join ? (
          <>
            <Button className="font-bold bg-white border border-primary text-primary hover:bg-border">
              챌린지 참여 중단하기
            </Button>
            <Button className="font-bold">친구 초대하기</Button>
          </>
        ) : (
          <>
            <Button className="font-bold">챌린지 참여하기</Button>
            <Button className="font-bold bg-white border border-primary text-primary hover:bg-border">
              친구 초대하기
            </Button>
          </>
        )}
        <div className="mx-auto pt-8">
          <span className="font-bold text-lg mr-1">{data.participation}</span>명
          참여중
        </div>
      </>
    );
  };

  useEffect(() => {
    if (ddayRef.current) {
      const dday = calculateDday(data.endDate);
      if (dday >= 8) {
        ddayRef.current.className += ' w-1/5';
        ddayRef.current.className += ' bg-blue-300';
      } else if (dday >= 4) {
        ddayRef.current.className += ' w-3/5';
        ddayRef.current.className += ' bg-blue-500';
      } else {
        ddayRef.current.className += ' w-full';
        ddayRef.current.className += ' bg-blue-700';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateDday = (timeString: string) => {
    const diff = Math.floor(
      (Date.parse(timeString) - Date.now() - 1000 * 60 * 60 * 9) /
        1000 /
        60 /
        60 /
        24
    );
    return diff;
  };

  return (
    <>
      <HeadBar />
      <div className="w-full xl:w-5/6 xl:mx-auto">
        <div className="bg-gray-200 w-full h-52 relative">
          <img
            className="absolute w-24 rounded-md top-40 right-1/2 translate-x-1/2"
            src={data.img}
            alt="img"
          />
        </div>
        <div className="pt-20 text-center text-xl font-bold">{data.title}</div>

        <div className="flex w-full justify-between pt-16 pr-5 lg:gap-5 lg-pr-0">
          <div className="flex flex-col ml-5 basis-full border-b-2 lg:basis-2/3">
            <div className="flex flex-row justify-between gap-5">
              {data.join ? (
                <div className="w-full">
                  <div className="w-full rounded-md flex flex-col gap-3 bg-white shadow mb-8 p-5">
                    <div className="flex justify-between">
                      <div className="font-bold">
                        {data.now}/{data.target}km
                      </div>
                      <div>D - {calculateDday(data.endDate)}</div>
                    </div>
                    <div className="relative rounded-full bg-gray-100 w-full h-5">
                      <div
                        ref={ddayRef}
                        className="absolute rounded-full h-5"
                      />
                    </div>
                  </div>
                  <ChallengeTop />
                </div>
              ) : (
                <ChallengeTop />
              )}

              <div className="flex flex-col gap-2 lg:hidden">
                <ButtonGroup />
              </div>
            </div>
          </div>

          <div className="basis-1/3 mr-5 flex-col gap-4 hidden lg:flex">
            <ButtonGroup />
          </div>
        </div>
      </div>
    </>
  );
}
