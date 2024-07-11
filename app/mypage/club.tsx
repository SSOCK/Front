import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DotMenu from '@/public/icons/dotMenu.svg';
import FillPin from '@/public/icons/fillpin.svg';
import People from '@/public/icons/people.svg';

export default function Club() {
  const router = useRouter();

  const data = [
    {
      id: 123,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '클럽명',
      loc: '서울',
      total: 100,
    },
    {
      id: 123,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '클럽명',
      loc: '온라인',
      total: 100,
    },
    {
      id: 123,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '클럽명',
      loc: '대한민국',
      total: 100,
    },
    {
      id: 123,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '클럽명',
      loc: '온라인',
      total: 100,
    },
    {
      id: 123,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '클럽명',
      loc: '온라인',
      total: 100,
    },
    {
      id: 123,
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '클럽명',
      loc: '온라인',
      total: 100,
    },
  ];

  const ClubComponent = ({
    id,
    img,
    name,
    loc,
    total,
  }: {
    id: number;
    img: string;
    name: string;
    loc: string;
    total: number;
  }) => {
    const [open, setOpen] = useState(false);

    const moveClub = () => router.push(`/club/${id}`);
    const outClub = () => {
      setOpen(false);
      // 탈퇴
    };

    return (
      <div className="h-20 py-3 border-b flex">
        <div
          className="h-full basis-2/5 flex items-center cursor-pointer sm:basis-1/2"
          onClick={moveClub}
        >
          <img
            className="h-full aspect-square border rounded-md"
            src={img}
            alt=""
          />
          <div className="font-bold ml-3">{name}</div>
        </div>

        <div className="basis-3/5 flex-shrink-0 flex justify-start sm:basis-1/2">
          <div className="basis-3/6 flex items-center">
            <FillPin className="h-4 mr-1" />
            {loc}
          </div>

          <div className="basis-2/6 flex items-center">
            <People className="h-5 mr-1" />
            {total}명
          </div>

          <div className="basis-1/6 flex items-center justify-around cursor-pointer relative">
            <DotMenu
              className="w-6 hover:bg-border"
              onClick={() => setOpen(!open)}
            />
            {open ? (
              <div
                className="absolute top-12 right-3 w-20 border p-1 cursor-pointer bg-white shadow hover:text-primary text-center"
                onClick={outClub}
              >
                탈퇴하기
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="text-xl font-bold">클럽</div>
      <div className="font-bold pt-10">내가 가입한 클럽</div>
      <div className="pt-3 sm:px-5">
        {data.map(({ id, img, name, loc, total }, index) => (
          <ClubComponent
            key={index}
            id={id}
            img={img}
            name={name}
            loc={loc}
            total={total}
          />
        ))}
      </div>
    </>
  );
}
