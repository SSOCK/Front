'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HeadBar, Map, MyMap } from '@components';
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
import FillPin from '@/public/icons/fillpin.svg';
import Location from '@/public/icons/location.svg';

interface Preview {
  alt: string;
  src: string;
}

const ClubSchema = z.object({
  title: z
    .string()
    .min(1, { message: '1자이상 100자이하로 입력해주세요.' })
    .max(100, { message: '1자이상 100자이하로 입력해주세요.' }),
  description: z.string(),
  locationName: z
    .string()
    .min(1, { message: '1자이상 100자이하로 입력해주세요.' })
    .max(100, { message: '1자이상 100자이하로 입력해주세요.' }),
});

export default function Create() {
  const mapRef = useRef<MyMap | undefined>(undefined);
  const [mapIsLoading, setMapIsLoading] = useState(true);
  const [center, setCenter] = useState(false);
  const [la, setLa] = useState(0);
  const [ma, setMa] = useState(0);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const checkLocation = () => {
    if (mapRef.current) mapRef.current.data.drawMode = true;
  };

  const Select = () => {
    return (
      <div className="absolute z-50 top-0 p-3 flex flex-col gap-5 items-center">
        <FillPin
          className="w-8 cursor-pointer fill-primary"
          onClick={checkLocation}
        />
        <Location
          className="w-10 curwor-pointer cursor-pointer"
          onClick={() => setCenter(true)}
        />
      </div>
    );
  };

  const RecordForm = useForm<z.infer<typeof ClubSchema>>({
    resolver: zodResolver(ClubSchema),
    defaultValues: {
      title: '',
      description: '',
      locationName: '',
    },
  });

  const uploadImage = (files: FileList | null) => {
    if (files === null || !files.length) return;

    const reg = /(.*?)\.(jpg|jpeg|png|gif)$/;
    if (!files[0].name.match(reg)) {
      setErrorMsg('지원되는 이미지 형식이 아닙니다.');
      return;
    }

    const newPreview: Preview = {
      alt: files[0].name,
      src: '',
    };

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      newPreview.src = reader.result as string;
      setPreview(newPreview);
    };
  };

  const deleteImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setErrorMsg('');
    setPreview(null);
  };

  const recordSubmit = async (data: z.infer<typeof ClubSchema>) => {
    if (la === 0 || ma === 0) {
      setErrorMsg('위치를 다시 선택해주세요.');
      return;
    }

    const formData = new FormData();
    const locationCoordinate = JSON.stringify({ La: la, Ma: ma });
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('locationName', data.locationName);
    formData.append('locationCoordinate', locationCoordinate);

    const url = '/api/club';
    const options = {
      method: 'post',
      body: formData,
    };

    try {
      const res = await fetchWithRetry(url, options);
      if (res!.status !== 201) throw res!.status;
      RecordForm.reset();
      setErrorMsg('');
      if (preview) {
        try {
          const imgOptions = {
            method: 'post',
            body: JSON.stringify({ newImageUrl: preview }),
          };
          const res = await fetchWithRetry('/api/image', imgOptions);
          if (res!.status !== 201) throw res!.status;
          setPreview(null);
        } catch (error) {
          setErrorMsg('전송을 다시 시도해주십시오.');
        }
      }
    } catch (error) {
      setErrorMsg('전송을 다시 시도해주십시오.');
    }
  };

  return (
    <>
      <HeadBar />

      <div className="bg-gray-100 w-full h-full">
        <div className="mx-auto p-5 max-w-5xl">
          <div className="font-bold text-2xl pt-10">클럽 생성</div>
          <Form {...RecordForm}>
            <form
              onSubmit={RecordForm.handleSubmit(recordSubmit)}
              className="w-full flex flex-col gap-5"
            >
              <FormField
                control={RecordForm.control}
                name="title"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="pt-10">
                    <FormLabel>
                      클럽명 <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          placeholder="ex. SSOCK"
                          type="text"
                          value={value}
                          onChange={(event) => {
                            onChange(event);
                            setErrorMsg('');
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={RecordForm.control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="basis-1/4 sm:basis-1/3">
                    <FormLabel>클럽 설명</FormLabel>
                    <div className="flex gap-1 items-center">
                      <FormControl>
                        <Input
                          type="text"
                          value={value}
                          onChange={(event) => {
                            onChange(event);
                            setErrorMsg('');
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={RecordForm.control}
                name="locationName"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="basis-1/4 sm:basis-1/3">
                    <FormLabel>
                      위치명 <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex gap-1 items-center">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="ex. 롯데타워"
                          value={value}
                          onChange={(event) => {
                            onChange(event);
                            setErrorMsg('');
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>
                  위치 선택 <span className="text-red-500">*</span>
                </FormLabel>
                <div className="font-sm text-gray-500">
                  핀을 선택 후 지도를 클릭하세요.
                </div>
                <div className="relative w-full h-96">
                  <Map
                    mapRef={mapRef}
                    setMapIsLoading={setMapIsLoading}
                    onePin={true}
                  />
                  {mapIsLoading ? null : <Select />}
                </div>
              </div>

              <div>
                <FormLabel>대표사진</FormLabel>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  id="record-img"
                  onChange={(event) => {
                    setErrorMsg('');
                    uploadImage(event.target.files);
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
              </div>

              {preview ? (
                <div className="flex w-full overflow-x-auto mb-5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={preview.src}
                      alt={preview.alt}
                      className="h-20 w-auto rounded-sm"
                    />
                    <div
                      className="absolute border bg-white rounded-sm top-0 right-0 text-sm w-5 text-center cursor-pointer"
                      onClick={deleteImage}
                    >
                      X
                    </div>
                  </div>
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
