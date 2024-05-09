import Post from '@/components/post';

const data: {
  id: string;
  date: string;
  photo: string;
  description: string;
  img?: string[];
}[] = [
  {
    id: '루피4',
    date: '2024-03-17',
    photo: '/img/testPhoto.jpg',
    img: ['/img/testImg.jpg'],
    description: '포스트 1입니다',
  },
  {
    id: '루피3',
    date: '2024-03-16',
    photo: '/img/testPhoto.jpg',
    img: ['/img/testImg.jpg'],
    description: '포스트 2입니다',
  },
  {
    id: '루피2',
    date: '2024-03-15',
    photo: '/img/testPhoto.jpg',
    img: ['/img/testImg.jpg'],
    description: '포스트 3입니다',
  },
  {
    id: '루피1',
    date: '2024-03-14',
    photo: '/img/testPhoto.jpg',
    description: '포스트 4입니다',
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pb-20">
      {data.map((d, index) => {
        return (
          <Post
            key={index}
            photo={d.photo}
            id={d.id}
            date={d.date}
            description={d.description}
            image={d.img}
          />
        );
      })}
    </main>
  );
}
