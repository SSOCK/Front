import { useEffect, useState } from 'react';
import { Post } from '@components';
import { fetchWithRetry } from '@utils/fetch';

async function getPost(): Promise<PostType[]> {
  const url = '/api/posts?postid=1&limit=10';
  const options = {
    method: 'get',
  };
  return fetchWithRetry(url, options);
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
  return data.map((post) => <Post key={post.id} postData={post} />);
}
