'use client';

import { useState } from 'react';
import { HeadBar } from '@components';
import { Button } from '@stories/Button';
import Board from './board';
import Chat from './chat';
import Member from './member';
import Plan from './plan';
import Rank from './rank';

export default function Home() {
  const name = '클럽명';
  const img = 'https://avatars.githubusercontent.com/u/96722691?v=5';
  const introduce = '클럽 소개글입니다.';
  const num = 5014;
  const selectClass =
    'border-b-2 font-bold w-full text-center pb-2 cursor-pointer hover:border-primary';

  const [list, setList] = useState({
    순위: true,
    멤버: false,
    일정: false,
    게시판: false,
    채팅: false,
  });

  const changeList = (title: '순위' | '멤버' | '일정' | '게시판' | '채팅') => {
    const newList = {
      순위: false,
      멤버: false,
      일정: false,
      게시판: false,
      채팅: false,
    };
    newList[title] = true;
    setList(newList);
  };

  return (
    <>
      <HeadBar />
      <div className="w-full flex justify-center">
        <div className="w-full xl:w-5/6">
          <div className="h-64 relative bg-border">
            <img
              className="w-28 h-28 absolute top-48 ml-5 border rounded-sm"
              src={img}
              alt="clubImg"
            />
          </div>

          <div className="flex w-full justify-between pt-16 pr-5 lg:gap-5 lg-pr-0">
            <div className="flex flex-col ml-5 basis-full lg:basis-2/3">
              <div className="flex flex-row justify-between">
                <div>
                  <div className="flex gap-5 font-bold text-lg pb-4 pr-5">
                    <div className="flex-shrink-0">{name}</div>
                    <div className="font-normal text-base">
                      🏃 {num}명이 함께 달리는 중
                    </div>
                  </div>
                  <div>{introduce}</div>
                </div>

                <div className="flex flex-col gap-2 lg:hidden">
                  <Button label="클럽 가입하기" className="font-bold" />
                  <Button
                    label="친구 초대하기"
                    variant="outline"
                    className="font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-around pt-10 lg:pt-20">
                <div
                  className={
                    selectClass + (list.순위 ? ' border-primary' : null)
                  }
                  onClick={() => changeList('순위')}
                >
                  순위
                </div>
                <div
                  className={
                    selectClass + (list.멤버 ? ' border-primary' : null)
                  }
                  onClick={() => changeList('멤버')}
                >
                  멤버
                </div>
                <div
                  className={
                    selectClass + (list.일정 ? ' border-primary' : null)
                  }
                  onClick={() => changeList('일정')}
                >
                  일정
                </div>
                <div
                  className={
                    selectClass + (list.게시판 ? ' border-primary' : null)
                  }
                  onClick={() => changeList('게시판')}
                >
                  게시판
                </div>
                <div
                  className={
                    selectClass + (list.채팅 ? ' border-primary' : null)
                  }
                  onClick={() => changeList('채팅')}
                >
                  채팅
                </div>
              </div>

              <div className="pt-10">
                {list.순위 ? <Rank club={name} /> : null}
                {list.멤버 ? <Member club={name} /> : null}
                {list.일정 ? <Plan club={name} /> : null}
                {list.게시판 ? <Board club={name} /> : null}
                {list.채팅 ? <Chat club={name} /> : null}
              </div>
            </div>

            <div className="basis-1/3 mr-5 flex-col gap-4 hidden lg:flex">
              <Button label="클럽 가입하기" className="font-bold" />
              <Button
                label="친구 초대하기"
                variant="outline"
                className="font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
