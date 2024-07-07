export default function Member({ club }: { club: string }) {
  const data = {
    운영진: [
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        position: '클럽장',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
        position: '부클럽장',
      },
    ],
    멤버: [
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        name: '이름',
      },
    ],
  };

  const MemberComponent = ({
    img,
    name,
    position,
    className,
  }: {
    img: string;
    name: string;
    position?: string;
    className: string;
  }) => {
    return (
      <div className={'border-b w-full flex items-center gap-2 ' + className}>
        <img
          className="w-10 ml-2 my-2 rounded-full border"
          src={img}
          alt="profile"
        />
        <div className="basis-full overflow-hidden flex gap-2 justify-between">
          <div className="flex-grow overflow-hidden">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </div>
          </div>
          <div className="flex-shrink-0 pr-2">{position}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-20">
      <div className="font-bold pb-5">운영진</div>
      <div className="w-full">
        {data.운영진.map(({ img, name, position }, index) => (
          <MemberComponent
            key={index}
            img={img}
            name={name}
            position={position}
            className={index === data.운영진.length - 1 ? 'border-none' : ''}
          />
        ))}
      </div>

      <div className="font-bold pb-5 pt-10">멤버</div>
      <div className="w-full">
        {data.멤버.map(({ img, name }, index) => (
          <MemberComponent
            key={index}
            img={img}
            name={name}
            className={index === data.멤버.length - 1 ? 'border-none' : ''}
          />
        ))}
      </div>
    </div>
  );
}
