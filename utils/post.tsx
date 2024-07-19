import { Dispatch, SetStateAction } from 'react';
import { fetchWithRetry } from './fetch';
import logout from './logout';

export async function getPost(postid: number): Promise<PostType[] | undefined> {
  const url = `/api/posts${postid && `?after=${postid}`}`;
  const options = {
    method: 'get',
  };
  const response = await fetchWithRetry(url, options);
  if (response!.status === 200) return await response!.json();
  else logout();
}

export async function loadPost(
  setLoading: Dispatch<SetStateAction<boolean>>,
  lastPostId: number,
  data: PostType[],
  setData: Dispatch<SetStateAction<PostType[]>>
) {
  setLoading(true);
  const posts = (await getPost(lastPostId)) as PostType[];
  setData([...data, ...posts]);
  setLoading(false);
}
