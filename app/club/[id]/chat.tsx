import { Button } from '@components/ui/button';
import { getPostTime } from '@utils/time';

export default function Chat({ club }: { club: string }) {
  const data = {
    default: {
      img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
      title: '채팅방 제목',
      lastChat: '2024-06-05T00:57:09.528969',
    },
    other: [
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        title: '채팅방 제목',
        lastChat: '2024-06-05T00:57:09.528969',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        title: '채팅방 제목',
        lastChat: '2024-06-05T00:57:09.528969',
      },
      {
        img: 'https://avatars.githubusercontent.com/u/96722691?v=5',
        title: '채팅방 제목',
        lastChat: '2024-06-05T00:57:09.528969',
      },
    ],
  };

  const ChatComponent = ({
    img,
    title,
    lastChat,
  }: {
    img: string;
    title: string;
    lastChat: string;
  }) => {
    return (
      <div className="flex items-center gap-5 py-5">
        <img
          className="w-20 h-20 rounded-full border"
          src={img}
          alt="profile"
        />
        <div className="w-full flex gap-3 justify-between">
          <div className="flex flex-col gap-3">
            <div className="font-bold">{title}</div>
            <div className="text-sm">{getPostTime(lastChat)} 새로운 대화</div>
          </div>
          <Button>채팅방 입장</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-20">
      <div className="font-bold">클럽 공식 단체 채팅방</div>
      <ChatComponent
        img={data.default.img}
        title={data.default.title}
        lastChat={data.default.lastChat}
      />
      <hr className="mt-5" />

      <div className="font-bold pt-10">그 외 참여 가능한 채팅방</div>
      {data.other.map(({ img, title, lastChat }, index) => (
        <ChatComponent
          key={index}
          img={img}
          title={title}
          lastChat={lastChat}
        />
      ))}
    </div>
  );
}
