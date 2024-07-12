'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import Right from '@/public/icons/right.svg';

interface DataProps {
  date: string;
  title: string;
  distance: number;
  time: string;
  altitude: number;
}

export default function Calendar({
  year,
  setYear,
  month,
  setMonth,
  day,
  setDay,
  data,
}: {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
  data: Array<DataProps>;
}) {
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;
  const nowDay = new Date().getDate();
  const days: Array<number> = [];
  data.forEach(({ date }) =>
    days.push(Number(date.split('-')[2].substring(0, 2)))
  );

  const makeCalendar = (year: number, month: number) => {
    const weeks = 6;
    const daysPerWeek = 7;
    const dateItems: Array<Array<number>> = Array.from({ length: weeks }, () =>
      Array(daysPerWeek).fill('')
    );

    const totalDays = new Date(year, month, 0).getDate();
    let currentDay = 1;
    const startDay = new Date(`${year}-${month}-01`).getDay();

    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < daysPerWeek; day++) {
        if (
          (week === 0 && day >= startDay) ||
          (week !== 0 && currentDay <= totalDays)
        ) {
          dateItems[week][day] = currentDay;
          currentDay++;
        }
      }
      if (currentDay > totalDays && week < weeks - 1) {
        dateItems.pop();
        break;
      }
    }
    return dateItems;
  };

  const [dateItems, setDateItems] = useState(makeCalendar(year, month));

  const changeToday = () => {
    setYear(nowYear);
    setMonth(nowMonth);
    setDay(nowDay);
    setDateItems(makeCalendar(nowYear, nowMonth));
  };

  const changeMonth = (flag: '+' | '-') => {
    if (flag === '+') {
      if (month === 12) {
        setYear(year + 1);
        setMonth(1);
        setDateItems(makeCalendar(year + 1, 1));
      } else {
        setMonth(month + 1);
        setDateItems(makeCalendar(year, month + 1));
      }
    } else {
      if (month === 1) {
        setYear(year - 1);
        setMonth(12);
        setDateItems(makeCalendar(year - 1, 12));
      } else {
        setMonth(month - 1);
        setDateItems(makeCalendar(year, month - 1));
      }
    }
    setDay(1);
  };

  return (
    <div className="h-96 w-full p-5 shadow sm:w-96 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-bold text-lg">
            {year}년 {month}월
          </div>
          <div
            className="ml-3 px-1 rounded-sm bg-primary text-white cursor-pointer"
            onClick={changeToday}
          >
            Today
          </div>
        </div>
        <div className="flex gap-3">
          <Right
            className="w-4 h-4 inline -scale-x-100 cursor-pointer"
            onClick={() => changeMonth('-')}
          />
          <Right
            className="w-4 h-4 inline cursor-pointer"
            onClick={() => changeMonth('+')}
          />
        </div>
      </div>

      <div className="flex justify-between gap-5 pt-5 text-sm">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>

      <div className="h-full pt-2 flex flex-col justify-between">
        {dateItems.map((items, index) => (
          <div key={index} className="flex justify-between gap-5">
            {items.map((dayItem, index) => (
              <div
                key={index}
                className={
                  'text-center w-6 h-6 cursor-pointer rounded-full' +
                  (dayItem === day ? ' bg-blue-700 text-white' : '') +
                  (days.includes(dayItem) ? ' bg-blue-500 text-white' : '') +
                  (year === nowYear && month === nowMonth && dayItem === nowDay
                    ? ' bg-primary text-white'
                    : '')
                }
                onClick={() => setDay(dayItem)}
              >
                {dayItem}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
