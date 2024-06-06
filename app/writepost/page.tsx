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
import Camera from '@/public/icons/camera.svg';

const WritePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: '1자이상 100자이하로 입력해주세요.' })
    .max(100, { message: '1자이상 100자이하로 입력해주세요.' }),
  content: z.string().max(2000, { message: '2000자이하로 입력해주세요.' }),
});

export default function WritePost() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [view, setView] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [warning, setWarning] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const WritePostForm = useForm<z.infer<typeof WritePostSchema>>({
    resolver: zodResolver(WritePostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleTextareaHeight = (
    refName: React.RefObject<HTMLTextAreaElement>
  ) => {
    refName.current!.style.height = 'auto';
    refName.current!.style.height = refName.current!.scrollHeight + 'px';
  };

  const deleteImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setPreview('');
    setImage(undefined);
    setView(false);
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => setPreview(reader.result as string);
    setImage(event.target.files[0]);
    setView(true);
  };

  const writePostSubmit = (data: z.infer<typeof WritePostSchema>) => {
    console.log(data.title, data.content, image);
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
                        <textarea
                          ref={titleRef}
                          rows={1}
                          placeholder="Title"
                          value={value}
                          onChange={(event) => {
                            onChange(event);
                            handleTextareaHeight(titleRef);
                          }}
                          className="textarea"
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

              <label htmlFor="file" className="block pt-2 pb-4">
                {view ? (
                  <>
                    <Button
                      type="button"
                      onClick={deleteImage}
                      className="p-2 my-2 block"
                    >
                      Delete
                    </Button>
                    <div className="flex justify-center">
                      <img
                        src={preview as string}
                        alt="preview"
                        className="pb-4"
                      />
                    </div>
                  </>
                ) : (
                  <Camera className="w-1/6 h-1/6" />
                )}
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
