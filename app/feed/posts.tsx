import { useEffect, useState, useRef } from 'react';
import { Post } from '@components';
import { fetchWithRetry } from '@utils/fetch';
import logout from '@utils/logout';

async function getPost(postid: number): Promise<PostType[] | undefined> {
  const url = `/api/posts${postid && `?after=${postid}`}`;
  const options = {
    method: 'get',
  };
  const response = await fetchWithRetry(url, options);
  if (response!.status === 200) return await response!.json();
  else logout();
}

export default function Posts() {
  const [data, setData] = useState<PostType[]>([]);
  const [lastPostId, setLastPostId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef(null);

  async function loadPost() {
    setLoading(true);
    const posts = (await getPost(lastPostId)) as PostType[];
    console.log(posts);
    setData([...data, ...posts]);
    setLoading(false);
  }

  useEffect(() => {
    loadPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPostId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          const lastId = [...data].pop()?.id ?? 1;
          setLastPostId(lastId);
        }
      },
      { threshold: 1.0 }
    );
    const ref = triggerRef.current;
    if (ref) {
      observer.observe(ref);
    }
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <>
      {data.map((post, index) => (
        <Post key={index} postData={post} />
      ))}
      <div ref={triggerRef}>{loading && <h1>loading...</h1>}</div>
    </>
  );
}
