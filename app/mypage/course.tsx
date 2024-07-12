import { useState } from 'react';
import DotMenu from '@/public/icons/dotMenu.svg';
import Save from '@/public/icons/save.svg';
import TriangleDown from '@/public/icons/triangleDown.svg';

export default function Course() {
  const data = {
    make: [
      {
        date: '2024-01-02T00:57:09.528969',
        name: '코스명',
        distance: 5,
        time: '00:00:00',
        altitude: 480,
      },
      {
        date: '2024-01-02T00:57:09.528969',
        name: '코스명',
        distance: 5,
        time: '00:00:00',
        altitude: 480,
      },
      {
        date: '2024-01-02T00:57:09.528969',
        name: '코스명',
        distance: 5,
        time: '00:00:00',
        altitude: 480,
      },
      {
        date: '2024-01-02T00:57:09.528969',
        name: '코스명',
        distance: 5,
        time: '00:00:00',
        altitude: 480,
      },
      {
        date: '2024-01-02T00:57:09.528969',
        name: '코스명',
        distance: 5,
        time: '00:00:00',
        altitude: 480,
      },
    ],
    save: [
      {
        name: '내가 만든 코스',
        open: true,
        count: 0,
      },
      {
        name: '자주 달리는 코스',
        open: true,
        count: 0,
      },
      {
        name: '서울',
        open: true,
        count: 0,
      },
      {
        name: '경기',
        open: true,
        count: 0,
      },
      {
        name: '강원도',
        open: true,
        count: 0,
      },
      {
        name: '제주도',
        open: true,
        count: 0,
      },
    ],
  };

  const MakeCourseComponent = ({
    date,
    name,
    distance,
    time,
    altitude,
  }: {
    date: string;
    name: string;
    distance: number;
    time: string;
    altitude: number;
  }) => {
    const Date = date.split('-');
    const day = Date[2].substring(0, 2);
    return (
      <div className="h-16 flex gap-1 px-1 items-center border-b sm:px-2">
        <div className="basis-3/12 flex-shrink-0 sm:basis-2/12">
          {Date[0]}.{Date[1]}.{day}
        </div>
        <div className="basis-4/12 sm:basis-4/12 whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </div>
        <div className="basis-2/12 flex-shrink-0">{distance}km</div>
        <div className="basis-3/12 flex-shrink-0 sm:basis-2/12">{time}</div>
        <div className="basis-2/12 flex-shrink-0 hidden sm:block">
          {altitude}m
        </div>
      </div>
    );
  };

  const SaveCourseComponent = ({
    name,
    open,
    count,
  }: {
    name: string;
    open: boolean;
    count: number;
  }) => {
    const [view, setView] = useState(false);
    const edit = () => {
      setView(false);
      // 코스 편집하기
    };

    return (
      <div className="flex gap-5 px-3 items-center h-16 border-b">
        <Save className="flex-shrink-0 w-8 h-8" />
        <div className="flex-grow grid max-w-full overflow-hidden">
          <div className="grid-cols-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </div>
          <div className="text-sm text-gray-400">
            {open ? '공개' : '비공개'} - {count}개 코스
          </div>
        </div>
        <div className="flex-shrink-0 w-6 relative">
          <DotMenu
            className="w-full cursor-pointer rounded-sm hover:bg-border"
            onClick={() => setView(!view)}
          />
          {view ? (
            <div
              className="absolute top-7 right-0 w-20 border p-1 cursor-pointer bg-white shadow hover:text-primary text-center"
              onClick={edit}
            >
              편집하기
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="text-xl font-bold">코스</div>
      <div className="font-bold pt-10 pb-5">내가 만든 코스</div>
      <div className="flex gap-1 border-b p-1 bg-gray-100 sm:px-2">
        <div className="basis-3/12 flex items-center flex-shrink-0 sm:basis-2/12">
          일자
          <TriangleDown className="w-2 inline ml-2" />
        </div>
        <div className="basis-4/12 flex items-center">
          코스명
          <TriangleDown className="w-2 inline ml-2" />
        </div>
        <div className="basis-2/12 flex items-center flex-shrink-0">
          거리
          <TriangleDown className="w-2 inline ml-2" />
        </div>
        <div className="basis-3/12 flex items-center flex-shrink-0 sm:basis-2/12">
          시간
          <TriangleDown className="w-2 inline ml-2" />
        </div>
        <div className="basis-2/12 items-center flex-shrink-0 hidden sm:flex">
          고도
          <TriangleDown className="w-2 inline ml-2" />
        </div>
      </div>
      {data.make.map(({ date, name, distance, time, altitude }, index) => (
        <MakeCourseComponent
          key={index}
          date={date}
          name={name}
          distance={distance}
          time={time}
          altitude={altitude}
        />
      ))}

      <div className="font-bold pt-10 pb-5">내가 저장한 코스</div>
      {data.save.map(({ name, open, count }, index) => (
        <SaveCourseComponent
          key={index}
          name={name}
          open={open}
          count={count}
        />
      ))}
    </>
  );
}
