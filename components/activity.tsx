import { useEffect, useState } from 'react';
import { Calendar } from '@components';
import Add from '@/public/icons/add.svg';

interface DataProps {
  date: string;
  title: string;
  distance: number;
  time: string;
  altitude: number;
}

export default function Activity({ userid }: { userid: number }) {
  const date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth() + 1);
  const [day, setDay] = useState<number>(date.getDate());
  const [dayItem, setDayItem] = useState<Array<DataProps>>([]);

  const data: Array<DataProps> = [
    {
      date: '2024-07-02T00:57:09.528969',
      title: '활동 제목',
      distance: 12.34,
      time: '03:10:00',
      altitude: 55,
    },
    {
      date: '2024-07-06T00:57:09.528969',
      title: '활동 제목',
      distance: 12.34,
      time: '03:10:00',
      altitude: 55,
    },
    {
      date: '2024-07-06T00:57:09.528969',
      title: '활동 제목',
      distance: 12.34,
      time: '03:10:00',
      altitude: 55,
    },
    {
      date: '2024-07-13T00:57:09.528969',
      title: '활동 제목',
      distance: 12.34,
      time: '03:10:00',
      altitude: 55,
    },
    {
      date: '2024-07-22T00:57:09.528969',
      title: '활동 제목',
      distance: 12.34,
      time: '03:10:00',
      altitude: 55,
    },
  ];

  useEffect(() => {
    // fetch data
  }, [year, month]);

  useEffect(() => {
    setDayItem(
      data.filter(
        (item) => Number(item.date.split('-')[2].substring(0, 2)) === day
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  const days: Array<number> = data.map(({ date }) =>
    Number(date.split('-')[2].substring(0, 2))
  );

  return (
    <>
      <div className="text-xl font-bold">활동</div>
      <div className="flex pt-5 pb-20 border-b-2">
        <Calendar
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          day={day}
          setDay={setDay}
          days={days}
        />
      </div>

      <div className="pt-10">
        {days.includes(day) ? (
          <div className="text-sm font-bold pb-5">
            {year}년 {month}월 {day}일 활동
            {dayItem.map(({ title, distance, time, altitude }, index) => (
              <div key={index} className="pt-5">
                <div className="shadow w-full p-5">
                  <div className="flex justify-between pb-5">
                    <div className="font-bold">{title}</div>
                    <Add className="inline w-8 fill-primary cursor-pointer" />
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <div className="text-sm text-gray-500 pb-1">거리</div>
                      <div className="font-bold">{distance}km</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 pb-1">시간</div>
                      <div className="font-bold">
                        {Number(time.split(':')[0]) !== 0
                          ? `${Number(time.split(':')[0])}시간 `
                          : ''}
                        {Number(time.split(':')[1]) !== 0
                          ? `${Number(time.split(':')[1])}분 `
                          : ''}
                        {Number(time.split(':')[2]) !== 0
                          ? `${Number(time.split(':')[2])}초`
                          : ''}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 pb-1">고도</div>
                      <div className="font-bold">{altitude}km</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
