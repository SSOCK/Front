'use client';

import { useState } from 'react';
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
// import { fetchWithRetry } from '@utils/fetch';

interface Preview {
  alt: string;
  src: string;
  lastModified: number;
  size: number;
}

const RecordSchema = z.object({
  title: z
    .string()
    .min(1, { message: '1자이상 100자이하로 입력해주세요.' })
    .max(100, { message: '1자이상 100자이하로 입력해주세요.' }),
  distance: z.coerce.number({ message: '숫자를 입력해주세요.' }),
  hour: z.coerce.number({ message: '숫자를 입력해주세요.' }),
  minute: z.coerce.number({ message: '숫자를 입력해주세요.' }),
  altitude: z.coerce.number({ message: '숫자를 입력해주세요.' }),
});

export default function Record() {
  const [image, setImage] = useState<Array<File>>([]);
  const [preview, setPreview] = useState<Array<Preview>>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const IMG_LIMIT_NUM = 5;

  const RecordForm = useForm<z.infer<typeof RecordSchema>>({
    resolver: zodResolver(RecordSchema),
    defaultValues: {
      title: '',
      distance: 0,
      hour: 0,
      minute: 0,
      altitude: 0,
    },
  });

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
    if (
      fileList.some((file) =>
        preview.some(
          (item) =>
            item.alt === file.name &&
            item.lastModified === file.lastModified &&
            item.size === file.size
        )
      )
    ) {
      setErrorMsg('동일한 이미지는 첨부할 수 없습니다.');
      return;
    }

    setImage(image.concat(fileList));

    const srcs: Preview[] = [];
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        srcs.push({
          src: reader.result as string,
          alt: file.name,
          lastModified: file.lastModified,
          size: file.size,
        });
        if (srcs.length === fileList.length) setPreview(preview.concat(srcs));
      };
    });
  };

  const deleteImage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    deleteImg: Preview
  ) => {
    event.preventDefault();
    setErrorMsg('');

    if (preview.length === 1) {
      setPreview([]);
      setImage([]);
      return;
    }

    setPreview(
      preview.filter(
        ({ src, alt }) => src !== deleteImg.src || alt !== deleteImg.alt
      )
    );

    setImage(
      image.filter(
        ({ name, lastModified, size }) =>
          name !== deleteImg.alt ||
          lastModified !== deleteImg.lastModified ||
          size !== deleteImg.size
      )
    );
  };

  const recordSubmit = async (data: z.infer<typeof RecordSchema>) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('distance', `${data.distance}`);
    formData.append('time', `${data.hour}:${data.minute}`);
    formData.append('altitude', `${data.altitude}`);
    image.forEach((item) => formData.append('image', item));

    // const url = '/api/abc'; // edit
    // const options = {
    //   method: 'post',
    //   body: formData,
    // };

    // try {
    //   const res = await fetchWithRetry(url, options);
    //   if (res!.status !== 201) throw res!.status;
    //   RecordForm.reset();
    //   setErrorMsg('');
    //   setImage([]);
    //   setPreview([]);
    // } catch (error) {
    //   setErrorMsg('전송을 다시 시도해주십시오.');
    // }
  };

  return (
    <>
      <HeadBar />

      <div className="bg-gray-100 w-full h-full">
        <div className="mx-auto p-5 max-w-5xl">
          <div className="font-bold text-2xl pt-10">활동 기록</div>
          <Form {...RecordForm}>
            <form
              onSubmit={RecordForm.handleSubmit(recordSubmit)}
              className="w-full"
            >
              <FormField
                control={RecordForm.control}
                name="title"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="pt-10">
                    <FormLabel>
                      활동 제목 <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          placeholder="ex. 퇴근 후 러닝"
                          type="text"
                          value={value}
                          onChange={onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="py-10 flex justify-between gap-3 sm:gap-10">
                <FormField
                  control={RecordForm.control}
                  name="distance"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="basis-1/4 sm:basis-1/3">
                      <FormLabel>
                        거리 <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex gap-1 items-center">
                        <FormControl>
                          <Input
                            type="number"
                            value={value}
                            onChange={(event) => {
                              onChange(event);
                              setErrorMsg('');
                            }}
                          />
                        </FormControl>
                        km
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="basis-2/4 sm:basis-1/3">
                  <FormLabel>
                    시간 <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex gap-2 pt-2">
                    <FormField
                      control={RecordForm.control}
                      name="hour"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <div className="flex gap-1 items-center">
                            <FormControl>
                              <Input
                                type="number"
                                value={value}
                                onChange={(event) => {
                                  onChange(event);
                                  setErrorMsg('');
                                }}
                              />
                            </FormControl>
                            <div className="flex-shrink-0">시간</div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={RecordForm.control}
                      name="minute"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <div className="flex gap-1 items-center">
                            <FormControl>
                              <Input
                                type="number"
                                value={value}
                                onChange={(event) => {
                                  onChange(event);
                                  setErrorMsg('');
                                }}
                              />
                            </FormControl>
                            분
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={RecordForm.control}
                  name="altitude"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="basis-1/4 sm:basis-1/3">
                      <FormLabel>
                        고도 <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex gap-1 items-center">
                        <FormControl>
                          <Input
                            type="number"
                            value={value}
                            onChange={(event) => {
                              onChange(event);
                              setErrorMsg('');
                            }}
                          />
                        </FormControl>
                        m
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormLabel>사진 첨부</FormLabel>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                id="record-img"
                multiple
                onChange={(event) => {
                  setErrorMsg('');
                  updateImage(event.target.files);
                  event.target.value = '';
                }}
                className="hidden"
              />
              <label
                htmlFor="record-img"
                className="bg-gray-100 border-dashed rounded-sm cursor-pointer h-32 border border-gray-400 flex justify-center items-center font-semibold underline text-gray-500 my-2"
              >
                파일 선택
              </label>

              {preview.length > 0 ? (
                <div className="flex gap-3 w-full overflow-x-auto mb-5">
                  {preview.map((item, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-20 w-auto rounded-sm mb-4"
                      />
                      <div
                        className="absolute border bg-white rounded-sm top-0 right-0 text-sm w-5 text-center cursor-pointer"
                        onClick={(event) => deleteImage(event, item)}
                      >
                        X
                      </div>
                    </div>
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
