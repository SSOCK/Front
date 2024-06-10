import { useEffect, useState } from 'react';
import { Post } from '@components';
import { fetchWithRetry } from '@utils/fetch';
import logout from '@utils/logout';

async function getPost(): Promise<PostType[] | undefined> {
  const url = '/api/posts?postid=1&limit=10';
  const options = {
    method: 'get',
  };
  const response = await fetchWithRetry(url, options);
  if (response!.status === 200) return await response!.json();
  else logout();
}

export default function Posts() {
  const [data, setData] = useState<PostType[]>([]);

  async function loadPost() {
    const posts = (await getPost()) as PostType[];
    setData(posts);
  }

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data.map((post) => <Post key={post.id} postData={post} />);
}
