import { useEffect, useState, useRef } from 'react';
import { Post } from '@components';
import { loadPost } from '@utils/post';

export default function Posts() {
  const [data, setData] = useState<PostType[]>([]);
  const [lastPostId, setLastPostId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    loadPost(setLoading, lastPostId, data, setData);
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
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      {data.map((post, index) => (
        <Post key={index} postid={post.id} />
      ))}
      <div ref={triggerRef}>{loading && <h1>loading...</h1>}</div>
    </>
  );
}
