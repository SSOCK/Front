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

interface Preview {
  src: string;
  name: string;
  lastModified: number;
  size: number;
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
  const [view, setView] = useState(false);
  const [preview, setPreview] = useState<Array<Preview>>([]);
  const [imgLimit, setImgLimit] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const ImgLimitNum = 10;
  const FormatError = 'png, jpg(jpeg), gif 형식만 가능합니다.';
  const SameError = '동일한 이미지는 첨부할 수 없습니다.';
  const PostError = '전송을 다시 시도해주십시오.';

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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    deleteImg: Preview
  ) => {
    event.preventDefault();
    fileRef.current!.value = '';
    setImgLimit(false);
    setErrorMsg('');

    if (preview.length === 1) {
      setPreview([]);
      setImage([]);
      setView(false);
      return;
    }

    setPreview(
      preview.filter(
        ({ src, name, lastModified, size }) =>
          src !== deleteImg.src ||
          name !== deleteImg.name ||
          lastModified !== deleteImg.lastModified ||
          size !== deleteImg.size
      )
    );

    // setPreview(
    //   preview.filter((obj) => JSON.stringify(obj) !== JSON.stringify(deleteImg))
    // );

    setImage(
      image.filter(
        ({ name, lastModified, size }) =>
          name !== deleteImg.name ||
          lastModified !== deleteImg.lastModified ||
          size !== deleteImg.size
      )
    );
  };

  const uploadImage = (files: FileList | null) => {
    if (files === null || !files.length) return;

    const reg = /(.*?)\.(jpg|jpeg|png|gif)$/;
    if (!files[0].name.match(reg)) {
      setErrorMsg(FormatError);
      return;
    }

    const newPreview: Preview = {
      src: '',
      name: files[0].name,
      lastModified: files[0].lastModified,
      size: files[0].size,
    };

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      newPreview.src = reader.result as string;
      if (
        preview.some(
          (item) =>
            item.src === newPreview.src &&
            item.name === newPreview.name &&
            item.lastModified === newPreview.lastModified &&
            item.size === newPreview.size
        )
      ) {
        setErrorMsg(SameError);
        return;
      }
      if (preview.length === ImgLimitNum - 1) setImgLimit(true);
      setPreview([...preview, newPreview]);
      setImage([...image, files[0]]);
      setView(true);
    };
  };

  const writePostSubmit = async (data: z.infer<typeof WritePostSchema>) => {
    const accessToken = sessionStorage.getItem('access-token');
    try {
      if (accessToken === null) throw 401;
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      image.forEach((item) => formData.append('image', item));

      const res = await fetch('/api/posts', {
        method: 'post',
        headers: new Headers({
          Authorization: accessToken,
        }),
        body: formData,
      });
      if (res.status !== 201) throw res.status;
      else {
        WritePostForm.reset();
        setErrorMsg('');
        setImage([]);
        setView(false);
        setPreview([]);
        setImgLimit(false);
      }
    } catch (error) {
      if (error === 401) console.log('refresh토큰으로 재소통 필요');
      setErrorMsg(PostError);
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
                        <textarea
                          ref={titleRef}
                          rows={1}
                          placeholder="Title"
                          value={value}
                          onChange={(event) => {
                            onChange(event);
                            setErrorMsg('');
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

              <label htmlFor="file" className="flex flex-col pt-2 pb-4">
                {!imgLimit ? <Camera className="w-1/6 h-1/6 pb-2" /> : null}
                {view ? (
                  <div className="justify-center">
                    {preview.map((item) => (
                      <div key={item.src + item.name}>
                        <Button
                          type="button"
                          onClick={(event) => deleteImage(event, item)}
                          className="p-2 mb-1 block"
                        >
                          Delete
                        </Button>
                        <img
                          src={item.src as string}
                          alt="preview"
                          className="pb-4"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </label>

              <input
                id="file"
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
                onChange={(event) => {
                  setErrorMsg('');
                  uploadImage(event.target.files);
                }}
              />

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

      <Navigation />
    </>
  );
}
