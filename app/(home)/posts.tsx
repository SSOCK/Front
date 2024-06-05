import { useEffect, useState } from 'react';
import { Post } from '@components';
import { tryAuthWithRefreshToken } from '@/utils/fetch';

async function getPost(): Promise<PostType[]> {
  try {
    const accessToken = sessionStorage.getItem('access-token');
    if (!accessToken) throw new Error('access token이 없습니다!!');

    const request = () =>
      fetch('/api/posts?postid=1&limit=10', {
        method: 'get',
        headers: new Headers({
          Authorization: accessToken,
        }),
      });
    const response = await request();
    if (response.status !== 200) {
      throw response.status;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    tryAuthWithRefreshToken();
    return [];
  }
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
  return data.map((post, index) => <Post key={post.id} postData={post} />);
}
