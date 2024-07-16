import { Post } from '@components';

export default function Feed() {
  const data = {
    follow: 100,
    following: 200,
    postCount: 1,
    posts: [
      {
        content: '내용을 작성해주세요. 블라블라어쩌구~',
        createdAt: '2024-07-02T00:57:09.528969',
        id: 123,
        imageUrls: ['https://avatars.githubusercontent.com/u/96722691?v=5'],
        modifiedAt: null,
        title: '제목',
        member: {
          email: 'unknown@unknown.com',
          id: 123,
          name: '이름',
          username: '유저네임',
          profilePicture:
            'https://avatars.githubusercontent.com/u/96722691?v=5',
        },
        likes: 900,
        comments: [
          {
            id: 456,
            content: '댓글단다ㅋ',
            username: 'test',
            createdAt: '2024-07-04T00:57:09.528969',
            postId: 132,
          },
        ],
      },
    ],
  };

  return (
    <>
      <div className="text-xl font-bold">피드</div>
      {data.posts.map((item, index) => (
        <Post key={index} postData={item} page={'mypage'} />
      ))}
    </>
  );
}
