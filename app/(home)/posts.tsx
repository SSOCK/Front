import { useEffect, useState } from 'react';
import { Post } from '@components';

async function getPost(): Promise<PostType[]> {
  const accessToken = sessionStorage.getItem('access-token');
  console.log(accessToken);
  if (!accessToken) throw new Error('access token이 없습니다!!');

  const response = await fetch('/api/posts?postid=1&limit=10', {
    method: 'get',
    headers: new Headers({
      Authorization: accessToken,
    }),
  });
  const data = await response.json();
  return data;
}

export default function Posts() {
  const [data, setData] = useState<PostType[]>([]);
  async function loadPost() {
    const posts = await getPost();
    setData(posts);
    console.log(data);
  }

  useEffect(() => {
    loadPost();
    console.log(data);
  }, []);
  return data.map((post, index) => <Post key={index} postData={post} />);
}
