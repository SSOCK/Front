'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HeadBar, Navigation } from '@components';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
      const res = await fetchWithRetry(url, options);
      if (res!.status !== 201) throw res!.status;
      WritePostForm.reset();
      setErrorMsg('');
      setImage([]);
      setPreview([]);
    } catch (error) {
      setErrorMsg('전송을 다시 시도해주십시오.');
    }
  };

  return (
    <>
      <HeadBar />

      <div className="mainPart p-5 flex flex-col items-center justify-between">
        <div className="flex flex-col bg-slate-300 p-5 rounded-md shadow-xl w-full h-full overflow-y-scroll">
          <Form {...WritePostForm}>
            <form
              onSubmit={WritePostForm.handleSubmit(writePostSubmit)}
              className="w-full"
            >
              <FormField
                control={WritePostForm.control}
                name="title"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          placeholder="Title"
                          type="text"
                          value={value}
                          onChange={onChange}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>제목을 입력해주세요</FormDescription>
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
                      <FormLabel>Content</FormLabel>
                      <div className="flex gap-1">
                        <FormControl>
                          <textarea
                            ref={contentRef}
                            placeholder="Content"
                            value={value}
                            onChange={(event) => {
                              onChange(event);
                              setErrorMsg('');
                              handleTextareaHeight(contentRef);
                            }}
                            className="textarea"
                          />
                        </FormControl>
                      </div>
                      <FormDescription>내용을 입력해주세요.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                multiple
                onChange={(event) => {
                  setErrorMsg('');
                  updateImage(event.target.files);
                }}
              />
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

              {errorMsg ? (
                <div className="text-red-500 pb-4">{errorMsg}</div>
              ) : null}
              <Button type="submit" className="h-12 w-full pt-auto">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
