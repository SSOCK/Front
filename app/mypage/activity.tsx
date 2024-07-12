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

export default function Activity() {
  const date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth() + 1);
  const [day, setDay] = useState<number>(date.getDate());

  useEffect(() => {
    // fetch data
  }, [year, month]);

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

  return (
    <>
      <div className="text-xl font-bold">활동</div>
      <div className="flex pt-5">
        <Calendar
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          day={day}
          setDay={setDay}
          data={data}
        />
      </div>
    </>
  );
}
