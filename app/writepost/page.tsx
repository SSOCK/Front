'use client';

import { useState, useRef } from 'react';
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
import { Textarea } from '@components/ui/textarea';
import Camera from '@/public/icons/camera.svg';

const WritePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: '1자이상 100자이하로 입력해주세요.' })
    .max(100, { message: '1자이상 100자이하로 입력해주세요.' }),
  content: z.string().max(2000, { message: '2000자이하로 입력해주세요.' }),
  image: z.instanceof(File).optional(),
});

export default function WritePost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | undefined>(undefined);

  const [view, s];
  const [warning, setWarning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const WritePostForm = useForm<z.infer<typeof WritePostSchema>>({
    resolver: zodResolver(WritePostSchema),
    defaultValues: {
      title: '',
      content: '',
      image: undefined,
    },
  });

  const uploadImage = (event: React.ChangeEvent) => {
    console.log('picture', event, event.target);
    const pictures = (event.target as HTMLInputElement).files as FileList;
    Array.from(pictures).map((file) => console.log(file));
  };

  const writePostSubmit = (data: z.infer<typeof WritePostSchema>) => {
    // 이 함수는 적절한 값이 채워졌을 때 실행됨 -> fetch문 작성
  };

  return (
    <>
      <HeadBar />

      <div className="mainPart p-5 flex flex-col items-center justify-between">
        <div className="flex flex-col bg-slate-300 p-5 rounded-md shadow-xl w-full h-full">
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
                          <Textarea
                            placeholder="Content"
                            value={value}
                            onChange={onChange}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>내용을 입력해주세요.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <label htmlFor="file" className="block pb-4">
                <Camera className="w-1/6 h-1/6" />
              </label>
              <input
                id="file"
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={uploadImage}
              />

              {warning ? (
                <div className="text-red-500 pb-4">
                  전송을 다시 시도해주십시오.
                </div>
              ) : null}

              <Button type="submit" className="h-12 w-full pt-auto">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <Navigation />
    </>
  );
}
