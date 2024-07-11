import { useRouter } from 'next/navigation';
import Calendar from '@/public/icons/calendar.svg';
import People from '@/public/icons/people.svg';

interface ChallengeProps {
  id: number;
  img: string;
  name: string;
  startDate: string;
  endDate: string;
  total: number;
  progress: number;
  hide: boolean;
}

export default function Challenge() {
  const router = useRouter();

  const data = {
    진행: [
      {
        id: 123,
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '챌린지명',
        startDate: '2024-06-05T00:57:09.528969',
        endDate: '2024-07-15T00:57:09.528969',
        total: 100,
        progress: 25,
      },
    ],
    예정: [
      {
        id: 123,
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '챌린지명',
        startDate: '2024-06-05T00:57:09.528969',
        endDate: '2024-07-15T00:57:09.528969',
        total: 100,
        progress: 0,
      },
      {
        id: 123,
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '챌린지명',
        startDate: '2024-06-05T00:57:09.528969',
        endDate: '2024-07-15T00:57:09.528969',
        total: 100,
        progress: 0,
      },
    ],
    종료: [
      {
        id: 123,
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '챌린지명',
        startDate: '2024-06-05T00:57:09.528969',
        endDate: '2024-07-15T00:57:09.528969',
        total: 100,
        progress: 75,
      },
      {
        id: 123,
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '챌린지명',
        startDate: '2024-06-05T00:57:09.528969',
        endDate: '2024-07-15T00:57:09.528969',
        total: 100,
        progress: 50,
      },
      {
        id: 123,
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '챌린지명',
        startDate: '2024-06-05T00:57:09.528969',
        endDate: '2024-07-15T00:57:09.528969',
        total: 100,
        progress: 100,
      },
    ],
  };

  const ChallengeComponent = ({
    id,
    img,
    name,
    startDate,
    endDate,
    total,
    progress,
    hide,
  }: ChallengeProps) => {
    const startDates = startDate.split('-');
    const endDates = endDate.split('-');
    const startDay = startDates[2].substring(0, 2);
    const endDay = endDates[2].substring(0, 2);

    return (
      <div
        className={
          'flex gap-3 items-center h-32 py-3 border-b' +
          (hide ? ' opacity-50' : '')
        }
        onClick={() => router.push(`/challenge/${id}`)}
      >
        <img className="basis-1/6 h-full border rounded-md" src={img} alt="" />
        <div className="basis-3/6 flex flex-col gap-1">
          <div className="font-bold text-lg">{name}</div>
          <div className="flex items-center text-gray-400">
            <Calendar className="h-5 inline pr-1 fill-gray-400" />
            {startDates[0]}.{startDates[1]}.{startDay} - {endDates[0]}.
            {endDates[1]}.{endDay}
          </div>
          <div className="flex items-center text-gray-400">
            <People className="h-5 inline pr-1 fill-gray-400" />
            {total}명
          </div>
        </div>
        <div className="basis-2/6 flex gap-2 items-center">
          <div className="basis-2/3 relative h-4 rounded-full bg-gray-100">
            <div
              className={
                'absolute h-4 rounded-full animate-fill' +
                (progress > 0
                  ? progress <= 20
                    ? ' w-1/6 bg-blue-200'
                    : progress <= 40
                      ? ' w-2/6 bg-blue-300'
                      : progress <= 60
                        ? ' w-3/6 bg-blue-400'
                        : progress <= 80
                          ? ' w-4/6 bg-blue-500'
                          : progress < 100
                            ? ' w-5/6 bg-blue-600'
                            : ' w-full bg-blue-700'
                  : '')
              }
            />
          </div>
          <div className="basis-1/3 font-bold flex-shrink-0">{progress}%</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="text-xl font-bold">챌린지</div>
      <div className="font-bold pt-8">진행 중인 챌린지</div>
      {data.진행.map(
        ({ id, img, name, startDate, endDate, total, progress }, index) => (
          <ChallengeComponent
            key={index}
            id={id}
            img={img}
            name={name}
            startDate={startDate}
            endDate={endDate}
            total={total}
            progress={progress}
            hide={false}
          />
        )
      )}

      <div className="font-bold pt-8">예정된 챌린지</div>
      {data.예정.map(
        ({ id, img, name, startDate, endDate, total, progress }, index) => (
          <ChallengeComponent
            key={index}
            id={id}
            img={img}
            name={name}
            startDate={startDate}
            endDate={endDate}
            total={total}
            progress={progress}
            hide={false}
          />
        )
      )}

      <div className="font-bold pt-8">종료된 챌린지</div>
      {data.종료.map(
        ({ id, img, name, startDate, endDate, total, progress }, index) => (
          <ChallengeComponent
            key={index}
            id={id}
            img={img}
            name={name}
            startDate={startDate}
            endDate={endDate}
            total={total}
            progress={progress}
            hide={true}
          />
        )
      )}
    </>
  );
}
