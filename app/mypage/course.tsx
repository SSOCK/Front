import DotMenu from '@/public/icons/dotMenu.svg';
import TriangleDown from '@/public/icons/triangleDown.svg';

export default function Course() {
  const data = [
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
  ];

  const CourseComponent = ({
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

  return (
    <>
      <div className="text-xl font-bold">코스</div>
      <div className="font-bold pt-10 pb-5">내가 만든 코스</div>
      <div className="flex gap-1 border-b px-1 bg-gray-100 sm:px-2">
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
      {data.map(({ date, name, distance, time, altitude }, index) => (
        <CourseComponent
          key={index}
          date={date}
          name={name}
          distance={distance}
          time={time}
          altitude={altitude}
        />
      ))}
    </>
  );
}
