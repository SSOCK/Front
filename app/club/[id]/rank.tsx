import First from '@/public/icons/first.svg';
import Second from '@/public/icons/second.svg';
import Third from '@/public/icons/third.svg';

export default function Rank({ club }: { club: string }) {
  const rankClass = 'flex justify-around border-b h-12';

  const data = {
    거리: [
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        dist: '000.0km',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        dist: '000.0km',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        dist: '000.0km',
      },
    ],
    시간: [
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        time: '00:00:00',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        time: '00:00:00',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        time: '00:00:00',
      },
    ],
    페이스: [
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        face: '000.0/km',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        face: '000.0/km',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        face: '000.0/km',
      },
    ],
    고도: [
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        alt: '000.0km',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        alt: '000.0km',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        alt: '000.0km',
      },
    ],
  };

  const SmallRankTitleTop = () => {
    return (
      <div className="flex justify-around border-b">
        <div className="basis-1/5" />
        <div className="basis-3/5 font-bold pl-2">거리</div>
        <div className="basis-3/5 font-bold pl-2">시간</div>
      </div>
    );
  };

  const SmallRankTitleBottom = () => {
    return (
      <div className="flex justify-around border-b pt-5">
        <div className="basis-1/5" />
        <div className="basis-3/5 font-bold pl-2">페이스</div>
        <div className="basis-3/5 font-bold pl-2">고도</div>
      </div>
    );
  };

  const RankTitle = () => {
    return (
      <div className="flex justify-around border-b">
        <div className="basis-1/12" />
        <div className="basis-5/12 font-bold pl-2">거리</div>
        <div className="basis-5/12 font-bold pl-2">시간</div>
        <div className="basis-5/12 font-bold pl-2">페이스</div>
        <div className="basis-5/12 font-bold pl-2">고도</div>
      </div>
    );
  };

  const RankComponent = ({
    img,
    name,
    unit,
  }: {
    img: string;
    name: string;
    unit: string;
  }) => {
    return (
      <div className="w-full h-full flex gap-2 border-x bg-slate-100">
        <div className="flex-shrink-0 flex items-center pl-2 py-2 basis-1/6">
          <img className="w-full rounded-full border" src={img} alt="profile" />
        </div>
        <div className="flex gap-2 justify-between basis-5/6 items-center py-2 w-fit min-w-0">
          <div className="flex-grow overflow-hidden">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </div>
          </div>
          <div className="flex-shrink-0 pr-2">{unit}</div>
        </div>
      </div>
    );
  };

  const SmallRankGroupTop = ({ idx }: { idx: number }) => {
    return (
      <>
        <div className="basis-3/5">
          <RankComponent
            img={data.거리[idx].img}
            name={data.거리[idx].name}
            unit={data.거리[idx].dist}
          />
        </div>
        <div className="basis-3/5">
          <RankComponent
            img={data.시간[idx].img}
            name={data.시간[idx].name}
            unit={data.시간[idx].time}
          />
        </div>
      </>
    );
  };

  const SmallRankGroupBottom = ({ idx }: { idx: number }) => {
    return (
      <>
        <div className="basis-3/5">
          <RankComponent
            img={data.페이스[idx].img}
            name={data.페이스[idx].name}
            unit={data.페이스[idx].face}
          />
        </div>
        <div className="basis-3/5">
          <RankComponent
            img={data.고도[idx].img}
            name={data.고도[idx].name}
            unit={data.고도[idx].alt}
          />
        </div>
      </>
    );
  };

  const SmallRank = () => {
    return (
      <>
        <SmallRankTitleTop />

        <div className={rankClass}>
          <div className="basis-1/5">
            <First className="w-full h-full" />
          </div>
          <SmallRankGroupTop idx={0} />
        </div>

        <div className={rankClass}>
          <div className="basis-1/5">
            <Second className="w-full h-full" />
          </div>
          <SmallRankGroupTop idx={1} />
        </div>

        <div className={rankClass}>
          <div className="basis-1/5">
            <Third className="w-full h-full" />
          </div>
          <SmallRankGroupTop idx={2} />
        </div>

        <SmallRankTitleBottom />

        <div className={rankClass}>
          <div className="basis-1/5">
            <First className="w-full h-full" />
          </div>
          <SmallRankGroupBottom idx={0} />
        </div>

        <div className={rankClass}>
          <div className="basis-1/5">
            <Second className="w-full h-full" />
          </div>
          <SmallRankGroupBottom idx={1} />
        </div>

        <div className={rankClass}>
          <div className="basis-1/5">
            <Third className="w-full h-full" />
          </div>
          <SmallRankGroupBottom idx={2} />
        </div>
      </>
    );
  };

  const RankGroup = ({ idx }: { idx: number }) => {
    return (
      <>
        <div className="basis-5/12">
          <RankComponent
            img={data.거리[idx].img}
            name={data.거리[idx].name}
            unit={data.거리[idx].dist}
          />
        </div>
        <div className="basis-5/12">
          <RankComponent
            img={data.시간[idx].img}
            name={data.시간[idx].name}
            unit={data.시간[idx].time}
          />
        </div>
        <div className="basis-5/12">
          <RankComponent
            img={data.페이스[idx].img}
            name={data.페이스[idx].name}
            unit={data.페이스[idx].face}
          />
        </div>
        <div className="basis-5/12">
          <RankComponent
            img={data.고도[idx].img}
            name={data.고도[idx].name}
            unit={data.고도[idx].alt}
          />
        </div>
      </>
    );
  };

  return (
    <div className="mb-20">
      <div className="font-bold pb-5">저번주 순위</div>
      <div className="flex flex-col">
        <div className="md:hidden">
          <SmallRank />
        </div>

        <div className="hidden md:block">
          <RankTitle />

          <div className={rankClass}>
            <div className="basis-1/12">
              <First className="w-full h-full" />
            </div>
            <RankGroup idx={0} />
          </div>

          <div className={rankClass}>
            <div className="basis-1/12">
              <Second className="w-full h-full" />
            </div>
            <RankGroup idx={1} />
          </div>

          <div className={rankClass}>
            <div className="basis-1/12">
              <Third className="w-full h-full" />
            </div>
            <RankGroup idx={2} />
          </div>
        </div>
      </div>

      <div className="font-bold pt-10 pb-5">이번주 순위</div>
      <div className="flex flex-col">
        <div className="md:hidden">
          <SmallRank />
        </div>

        <div className="hidden md:block">
          <RankTitle />

          <div className={rankClass}>
            <div className="basis-1/12">
              <First className="w-full h-full" />
            </div>
            <RankGroup idx={0} />
          </div>

          <div className={rankClass}>
            <div className="basis-1/12">
              <Second className="w-full h-full" />
            </div>
            <RankGroup idx={1} />
          </div>

          <div className={rankClass}>
            <div className="basis-1/12">
              <Third className="w-full h-full" />
            </div>
            <RankGroup idx={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
