'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel';
import { fetchWithRetry } from '@utils/fetch';
import { getPostTime } from '@utils/time';
import { ProfileRecoil } from '@atoms';
import Comment from '@/public/icons/comment.svg';
import DotMenu from '@/public/icons/dotMenu.svg';
import Like from '@/public/icons/like.svg';
import Share from '@/public/icons/share.svg';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';

type PostProps = {
  postid: number;
  page?: string;
};

export default function Post({ postid, page }: PostProps) {
  const router = useRouter();
  const userData = useRecoilValue(ProfileRecoil);

  const [postData, setPostData] = useState<PostType>();
  const [like, setLike] = useState(false);
  const [viewComment, setViewComment] = useState(false);
  const [commentDelError, setCommentDelError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const deleteFeedRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);
  const ComentLengthLimit = 2000;

  useEffect(() => {
    // 게시물 좋아야 유무 확인 필요 -> setLike 조절
    const getPost = async () => {
      const res = await fetch(`/api/posts/${postid}`, {
        method: 'get',
      });
      if (res.status !== 200) throw res.status;
      setPostData(await res.json());
    };
    getPost();
  }, [postid, postData]);

  const pushLike = async () => {
    // api 소통 결과 확인 필요 (api 수정 후)
    if (userData.id === -1 || !postData) return;
    const url = `/api/posts/${postData.id}/like`;
    const response = await fetchWithRetry(url, {
      method: 'POST',
    });

    if (response!.status !== 201) return;
    setLike(!like);
  };

  const changeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setSubmitError(false);
    if (event.target.value.length > ComentLengthLimit) {
      setCommentError(true);
      commentRef.current!.value = event.target.value.substring(
        0,
        ComentLengthLimit
      );
      return;
    }
    setCommentError(false);
  };

  const sendComment = async () => {
    if (userData.id === -1 || !postData) return;
    setSubmitError(false);
    if (
      !commentRef.current?.value ||
      commentRef.current!.value.length > ComentLengthLimit
    ) {
      setCommentError(true);
      return;
    }

    const url = `/api/posts/${postData.id}/comments`;
    const response = await fetchWithRetry(url, {
      method: 'POST',
      body: JSON.stringify({
        content: commentRef.current?.value,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response!.status !== 201) {
      setSubmitError(true);
      return;
    }
    setViewComment(false);
    setPostData(undefined);
  };

  const deleteComment = async (id: number) => {
    setCommentDelError(false);
    const url = `/api/comments/${id}`;
    const response = await fetchWithRetry(url, {
      method: 'DELETE',
    });
    if (response!.status !== 204) {
      setCommentDelError(true);
      return;
    }
    setPostData(undefined);
  };

  const viewRemovePost = () => {
    deleteFeedRef.current!.style.display === 'block'
      ? (deleteFeedRef.current!.style.display = 'none')
      : (deleteFeedRef.current!.style.display = 'block');
  };

  const removePost = async () => {
    if (!postData) return;
    const url = `/api/posts/${postData.id}`;
    const response = await fetchWithRetry(url, {
      method: 'DELETE',
    });

    if (response!.status !== 204) return;
    setPostData(undefined);
  };

  return (
    <>
      {postData ? (
        <div className="w-full p-5">
          <div className="flex flex-col bg-white p-5 shadow gap-5">
            <div className="flex flex-row gap-4 flex-auto items-center cursor-pointer">
              <Avatar className="size-12 border">
                <AvatarImage
                  src={postData.member.profilePicture}
                  alt="profile"
                />
                <AvatarFallback>
                  <h6 className="text-xs">{postData.member.username}</h6>
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <h1 className="font-bold">{postData.member.username}</h1>
                <h2 className="text-xs">
                  {postData.modifiedAt
                    ? `${postData.modifiedAt.split('-')[0]}년 ${Number(postData.modifiedAt.split('-')[1])}월 ${Number(postData.modifiedAt.split('-')[2].substring(0, 2))}일 ${postData.modifiedAt.split(':')[0].slice(-2)}:${postData.modifiedAt.split(':')[1]}`
                    : `${postData.createdAt.split('-')[0]}년 ${Number(postData.createdAt.split('-')[1])}월 ${Number(postData.createdAt.split('-')[2].substring(0, 2))}일 ${postData.createdAt.split(':')[0].slice(-2)}:${postData.createdAt.split(':')[1]}`}
                </h2>
              </div>

              {page === 'mypage' ? (
                <div className="w-7 ml-auto relative">
                  <DotMenu
                    className="w-full rounded-md hover:bg-border"
                    onClick={viewRemovePost}
                  />
                  <div
                    ref={deleteFeedRef}
                    className="absolute border shadow px-2 py-1 right-0 bg-white w-24 hover:text-primary"
                    style={{ display: 'none' }}
                    onClick={removePost}
                  >
                    삭제하기
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className="flex-auto flex flex-col items-center ml-16 cursor-pointer"
              onClick={() => router.push(`/feed/${postData.id}`)}
            >
              <div className="w-full pb-2">
                <h6 className="text-lg font-bold">{postData.title}</h6>
              </div>
              <div className=" w-full">
                <h6>{postData.content}</h6>
              </div>
              {postData.imageUrls.length !== 0 && (
                <Carousel className="w-full px-8 py-4">
                  <CarouselContent>
                    {postData.imageUrls.map((url, index) => (
                      <CarouselItem key={index}>
                        <div className="flex justify-center h-80 w-full">
                          <img src={url} alt={url} className="object-contain" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {postData.imageUrls.length > 1 && (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  )}
                </Carousel>
              )}
            </div>

            <div className="flex-auto flex gap-10 ml-16">
              <Button variant="ghost" className="p-0" onClick={pushLike}>
                <Like className={'mr-2' + (like ? ' fill-blue-500' : '')} />
                <h5>{postData.likes}</h5>
              </Button>
              <Button
                variant="ghost"
                className="p-0"
                onClick={() => setViewComment(!viewComment)}
              >
                <Comment className="mr-2 stroke-blue-500" />
                <h5>{postData.comments.length}</h5>
              </Button>
              <Button variant="ghost" className="p-0" onClick={() => {}}>
                <Share className="mr-2 w-6" />
                <h5>{postData.comments.length}</h5>
              </Button>
            </div>
          </div>

          {viewComment ? (
            <div className="border rounded-sm p-5 pb-3">
              <Button
                className="pl-auto mb-2"
                onClick={() => setViewComment(false)}
              >
                x
              </Button>
              <div className="flex pb-5">
                <Input
                  ref={commentRef}
                  placeholder="댓글을 입력해주세요"
                  className="mr-2"
                  onChange={changeComment}
                />
                <Button onClick={sendComment}>전송</Button>
              </div>

              {commentError ? (
                <p className="text-right text-red-500">
                  댓글은 한글자 이상 2000자 이하로 입력 가능합니다.
                </p>
              ) : null}
              {submitError ? (
                <p className="text-right text-red-500">
                  댓글을 다시 전송해주십시오.
                </p>
              ) : null}

              {postData.comments.map((comments, index) => (
                <div key={index} className="pb-5">
                  <div className="flex flex-row gap-4 flex-auto items-center cursor-pointer">
                    <Avatar className=" size-12">
                      <AvatarFallback>
                        <h6 className="text-xs">{comments.username}</h6>
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1">
                      <h1 className="text-xs font-semibold">
                        {comments.username}
                      </h1>
                      <h2 className="text-xs">
                        {getPostTime(comments.createdAt)}
                      </h2>
                    </div>
                    {comments.username === userData.username ? (
                      <div
                        className="ml-auto text-sm cursor-pointer text-red-500"
                        onClick={() => deleteComment(comments.id)}
                      >
                        delete
                      </div>
                    ) : null}
                  </div>
                  {commentDelError ? (
                    <p className="text-right text-red-500">
                      댓글 삭제를 다시 진행해주십시오.
                    </p>
                  ) : null}

                  <div className="pt-2 ml-16">{comments.content}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
