'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';

interface PostProps {
  photo: string;
  id: string;
  date: string;
  description: string;
  image?: string[];
}

export default function Post({
  photo,
  id,
  date,
  description,
  image = undefined,
}: PostProps) {
  return (
    <div className="w-full p-5">
      <div className="flex flex-col bg-slate-300 p-5 rounded-xl shadow-xl">
        <div className="flex flex-row gap-5 flex-auto">
          <Avatar>
            <AvatarImage src={photo} alt="" />
            <AvatarFallback>
              <h6 className="text-xs">{id}</h6>
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-sm">{id}</h1>
            <h2 className="text-sm">{date}</h2>
          </div>
        </div>

        <div className="flex-auto p-5">
          {image
            ? image.map((img, index) => {
                return (
                  <Image key={index} src={img} alt="" width={200} height={0} />
                );
              })
            : null}
          <h6>{description}</h6>
        </div>

        <div className="flex-auto flex justify-between pl-5 pr-5">
          <Button>좋아요</Button>
          <Button>댓글</Button>
          <Button>공유</Button>
        </div>
      </div>
    </div>
  );
}
