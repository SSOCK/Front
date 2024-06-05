import { useEffect, useState } from 'react';
import { Post } from '@components';
import { fetchWithRetry, getAccessToken } from '@/utils/fetch';

async function getPost() {
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
    //console.log(posts);
  }

  useEffect(() => {
    loadPost();
    //console.log(data);
  }, []);
  return data.map((post, index) => <Post key={post.id} postData={post} />);
}
