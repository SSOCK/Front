import { useEffect, useState } from 'react';

async function getPost() {
  const accessToken = sessionStorage.getItem('access-token');
  console.log(accessToken);
  if (!accessToken) return new Error('access token이 없습니다!!');

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
  const [data, setData] = useState([]);
  useEffect(() => {
    async function aa() {
      const posts = await getPost();
      setData(posts);
    }
    aa();
  }, []);
  console.log(data);
  return <div>test</div>;
}
