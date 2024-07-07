export default function Board({ club }: { club: string }) {
  const data = [
    {
      profile: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '이름',
      date: '2024-06-05T00:57:09.528969',
      text: '내용을 작성해주세요.',
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
    },
    {
      profile: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '이름',
      date: '2024-06-05T00:57:09.528969',
      text: '내용을 작성해주세요.',
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
    },
    {
      profile: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      name: '이름',
      date: '2024-06-05T00:57:09.528969',
      text: '내용을 작성해주세요.',
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
    },
  ];

  const BoardComponent = ({
    profile,
    name,
    date,
    text,
    img,
  }: {
    profile: string;
    name: string;
    date: string;
    text: string;
    img: string;
  }) => {
    const timezone = date.split('-');
    const day = timezone[2].substring(0, 2);
    const time = timezone[2].substring(3).split('.')[0].split(':');

    return (
      <div className="shadow rounded-md mt-5 p-5 flex gap-3">
        <img
          className="w-12 h-12 rounded-full border"
          src={profile}
          alt="profile"
        />
        <div className="w-full">
          <div className="font-bold">{name}</div>
          <div className="text-sm">
            {timezone[0]}년 {timezone[1]}월 {day}일 {time[0]}:{time[1]}
          </div>
          <div className="pt-5">{text}</div>
          <div className="mt-4 flex justify-center">
            <img className="" src={img} alt="img" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-20">
      <div className="font-bold">활동 게시물</div>
      <div className="w-full">
        {data.map(({ profile, name, date, text, img }, index) => (
          <BoardComponent
            key={index}
            profile={profile}
            name={name}
            date={date}
            text={text}
            img={img}
          />
        ))}
      </div>
    </div>
  );
}
