import Calendar from '@/public/icons/calendar.svg';
import FillPin from '@/public/icons/fillpin.svg';
import People from '@/public/icons/people.svg';

export default function Plan({ club }: { club: string }) {
  const data = [
    {
      title: '제목',
      date: '2024-06-05T00:57:09.528969',
      loc: '반포한강공원',
      participation: 0,
      total: 0,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
    },
    {
      title: '제목',
      date: '2024-06-05T00:57:09.528969',
      loc: '반포한강공원',
      participation: 0,
      total: 0,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
    },
    {
      title: '제목',
      date: '2024-06-05T00:57:09.528969',
      loc: '반포한강공원',
      participation: 0,
      total: 0,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
    },
  ];

  const PlanComponent = ({
    title,
    date,
    loc,
    participation,
    total,
    img,
    className,
  }: {
    title: string;
    date: string;
    loc: string;
    participation: number;
    total: number;
    img: string;
    className: string;
  }) => {
    const timezone = date.split('-');
    const day = timezone[2].substring(0, 2);
    const time = timezone[2].substring(3).split('.')[0].split(':');

    return (
      <div className={'flex items-center gap-5 border-b py-5 ' + className}>
        <div className="overflow-hidden w-40 h-28 border rounded-lg">
          <img src={img} alt="img" />
        </div>
        <div>
          <div className="pb-2 font-bold flex gap-3">
            <div>{title}</div>
            <div className="flex items-center bg-primary rounded-lg px-2 text-white text-sm">
              모집중
            </div>
          </div>
          <div className="text-zinc-400">
            <Calendar className="w-5 inline mr-3" />
            {timezone[0]}년 {timezone[1]}월 {day}일 {time[0]}:{time[1]}
          </div>
          <div className="text-zinc-400">
            <FillPin className="w-5 h-5 inline mr-2" /> {loc}
          </div>
          <div className="text-zinc-400">
            <People className="w-6 inline mr-1" /> {participation}/{total}명
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-20">
      <div className="font-bold">다가오는 일정</div>
      <div className="w-full">
        {data.map(({ title, date, loc, participation, total, img }, index) => (
          <PlanComponent
            key={index}
            title={title}
            date={date}
            loc={loc}
            participation={participation}
            total={total}
            img={img}
            className={index === data.length - 1 ? 'border-none' : ''}
          />
        ))}
      </div>
    </div>
  );
}
