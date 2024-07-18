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
import ImageInputForm from '@components/imageInputForm';

const WritePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: '1자이상 100자이하로 입력해주세요.' })
    .max(100, { message: '1자이상 100자이하로 입력해주세요.' }),
  content: z.string().max(2000, { message: '2000자이하로 입력해주세요.' }),
});

export default function WritePost() {
  const [files, setFiles] = useState<Array<File>>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [posting, setPosting] = useState<boolean>(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const WritePostForm = useForm<z.infer<typeof WritePostSchema>>({
    resolver: zodResolver(WritePostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const writePostSubmit = async (data: z.infer<typeof WritePostSchema>) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    files.forEach((item) => formData.append('image', item));

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
      setFiles([]);
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
              <ImageInputForm
                fileList={files}
                setFileList={setFiles}
                className="flex flex-col gap-3"
              ></ImageInputForm>

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
