'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HeadBar } from '@components';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { fetchWithRetry } from '@utils/fetch';

interface Preview {
  alt: string;
  src: string;
}

const WritePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: '1자이상 100자이하로 입력해주세요.' })
    .max(100, { message: '1자이상 100자이하로 입력해주세요.' }),
  content: z.string().max(2000, { message: '2000자이하로 입력해주세요.' }),
});

export default function WritePost() {
  const [image, setImage] = useState<Array<File>>([]);
  const [preview, setPreview] = useState<Array<Preview>>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [posting, setPosting] = useState<boolean>(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const IMG_LIMIT_NUM = 10;

  const WritePostForm = useForm<z.infer<typeof WritePostSchema>>({
    resolver: zodResolver(WritePostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    const srcs: Preview[] = [];
    image.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        srcs.push({ src: reader.result as string, alt: file.name });
        if (srcs.length === image.length) setPreview(srcs);
        //비동기로 이미지소스 읽어와서 어떤게 마지막에 끝날지 알 수 없음
      };
    });
  }, [image]);

  const updateImage = (files: FileList | null) => {
    const fileList = Array.from(files ?? []);
    const reg = /(.*?)\.(jpg|jpeg|png|gif)$/i;

    if (fileList.length > IMG_LIMIT_NUM) {
      setErrorMsg(`${IMG_LIMIT_NUM}개의 이미지까지만 지원합니다.`);
      return;
    }
    if (fileList.some((file) => !reg.test(file.name))) {
      setErrorMsg('jpg, jpeg, png, gif형식만 지원합니다.');
      return;
    }
    setImage(fileList);
  };
  const handleTextareaHeight = (
    refName: React.RefObject<HTMLTextAreaElement>
  ) => {
    refName.current!.style.height = 'auto';
    refName.current!.style.height = refName.current!.scrollHeight + 'px';
  };

  const writePostSubmit = async (data: z.infer<typeof WritePostSchema>) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    image.forEach((item) => formData.append('image', item));

    const url = '/api/posts';
    const options = {
      method: 'post',
      body: formData,
    };

    try {
      setPosting(true);
      const res = await fetchWithRetry(url, options);
      if (res!.status !== 201) throw res!.status;
      WritePostForm.reset();
      setErrorMsg('');
      setImage([]);
      setPreview([]);
      setPosting(false);
      window.location.href = '/feed';
    } catch (error) {
      setPosting(false);
      setErrorMsg('전송을 다시 시도해주십시오.');
    }
  };

  return (
    <>
      <HeadBar />
      {posting && (
        <div className="fixed bg-slate-500 bg-opacity-20 z-50 size-full top-0 left-0 flex items-center justify-center">
          waiting...
        </div>
      )}
      <div className="mainPart bg-gray-100 flex flex-col items-center justify-between">
        <div className="flex flex-col p-5 w-full h-full max-w-5xl">
          <Form {...WritePostForm}>
            <form
              onSubmit={WritePostForm.handleSubmit(writePostSubmit)}
              className="w-full gap-10 flex flex-col"
            >
              <h1 className=" font-bold text-xl">게시글 작성</h1>
              <FormField
                control={WritePostForm.control}
                name="title"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          placeholder="제목을 입력해주세요"
                          type="text"
                          value={value}
                          onChange={onChange}
                          className="rounded-sm border"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="py-4">
                <FormField
                  control={WritePostForm.control}
                  name="content"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel className="inline">
                        내용 <p className="text-primary inline">*</p>
                      </FormLabel>
                      <div className="flex gap-1">
                        <FormControl>
                          <textarea
                            ref={contentRef}
                            placeholder="내용을 입력해주세요(필수)"
                            value={value}
                            onChange={(event) => {
                              onChange(event);
                              setErrorMsg('');
                              // handleTextareaHeight(contentRef);
                            }}
                            className="textarea border rounded-sm resize-none h-32 overflow-y-scroll"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <FormLabel>사진 첨부</FormLabel>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  id="feed-img"
                  multiple
                  onChange={(event) => {
                    setErrorMsg('');
                    updateImage(event.target.files);
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="feed-img"
                  className="bg-gray-100 border-dashed rounded-sm cursor-pointer h-32 border border-gray-400 flex justify-center items-center font-semibold underline text-gray-500"
                >
                  파일 선택
                </label>
                {preview.length > 0 ? (
                  <div className="justify-center">
                    {preview.map((item, index) => (
                      <img
                        key={index}
                        src={item.src}
                        alt={item.alt}
                        className="pb-4"
                      />
                    ))}
                  </div>
                ) : null}
                <h5 className="text-sm text-gray-400">
                  첨부 파일은 최대5개, 500MB까지 등록 가능합니다.
                </h5>
              </div>
              {errorMsg ? (
                <div className="text-red-500 pb-4">{errorMsg}</div>
              ) : null}
              <div className="grid grid-cols-2 gap-10 ">
                <Link href="/feed" className="w-full">
                  <Button className="bg-white text-gray-700 w-full rounded-[2px] border">
                    취소
                  </Button>
                </Link>
                <Button type="submit" className="rounded-[2px]">
                  등록
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
