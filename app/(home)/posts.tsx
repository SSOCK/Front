import { useEffect, useState } from 'react';
import { Post } from '@components';

async function getPost(): Promise<PostType[]> {
  const accessToken = sessionStorage.getItem('access-token');
  if (!accessToken) throw new Error('access token이 없습니다!!');

  const response = await fetch('/api/posts?postid=1&limit=10', {
    method: 'get',
    headers: new Headers({
      Authorization: accessToken,
    }),
  });
  return await response.json();
}

export default function Posts() {
  const [data, setData] = useState<PostType[]>([]);

  async function loadPost() {
    const posts = await getPost();
    setData(posts);
  }

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data.map((post, index) => <Post key={index} postData={post} />);
}
