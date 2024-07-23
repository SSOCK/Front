'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HeadBar, Post } from '@components';

export default function Home() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'get',
      });
      if (res.status !== 200) throw res.status;
      setPost(await res.json());
    };
    getPost();
  }, [id]);

  return (
    <>
      <HeadBar />
      <div className="flex mx-auto w-full xl:w-5/6">
        {post !== undefined ? <Post postData={post} /> : null}
      </div>
    </>
  );
}
