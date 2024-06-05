'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Comment from '@/public/icons/comment.svg';
import Like from '@/public/icons/like.svg';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

type PostProps = {
  postData: PostType;
};

export default function Post({ postData }: PostProps) {
  return (
    <div className="w-full p-5">
      <div className="flex flex-col bg-slate-300 p-5 rounded-md shadow-xl">
        <div className="flex flex-row gap-5 flex-auto">
          <Avatar>
            {postData.imageUrl ? (
              <AvatarImage src={postData.imageUrl} alt="" />
            ) : null}
            <AvatarFallback>
              <h6 className="text-xs">{postData.member.username}</h6>
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className=" text-sm font-semibold">
              {postData.member.username}
            </h1>
            <h2 className="text-sm">{postData.createdAt}</h2>
          </div>
        </div>

        <div className="flex-auto p-5 flex flex-col items-center">
          <div className="w-full">
            <h6 className="text-lg font-bold">{postData.title}</h6>
          </div>
          {/*여기 나중에 image여러개 지원하면 바꿔야댐*/}
          {postData.imageUrl ? (
            <Carousel className="w-full max-w-xs p-4">
              <CarouselContent>
                <CarouselItem>
                  <div className="flex justify-center">
                    <Image
                      src={postData.imageUrl}
                      alt=""
                      width={200}
                      height={0}
                      className=" rounded-sm"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : null}

          <div className=" w-full">
            <h6>{postData.content}</h6>
          </div>
        </div>

        <div className="flex-auto flex pl-5 pr-5">
          <Button variant={'ghost'}>
            <Like className="mr-2" />
            <h5>좋아요 N개</h5>
          </Button>
          <Button variant={'ghost'}>
            <Comment className="mr-2" />
            <h5>댓글 N개</h5>
          </Button>
        </div>
      </div>
    </div>
  );
}
