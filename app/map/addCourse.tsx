'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LatLng, MyMap } from '@components';
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

const CourseFormSchema = z.object({
  title: z.string().min(2, '2글자 이상').max(20),
  difficulty: z.coerce.number().min(0).max(2),
  distance: z.number().min(0).max(300),
  course: z
    .array(z.object({ La: z.number(), Ma: z.number() }))
    .min(2, '좌표를 두개 이상 찍어주세요.'),
});

export default function AddCourse({
  mapRef,
}: {
  mapRef: React.MutableRefObject<MyMap | undefined>;
}) {
  const [drawMode, setDrawMode] = useState(false);
  const [dots, setDots] = useState<LatLng[]>([]);

  const form = useForm<z.infer<typeof CourseFormSchema>>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      title: '',
      difficulty: 1,
      distance: 0,
      course: [],
    },
  });

  const toggleMode = () => {
    if (!mapRef.current) return;
    const { data } = mapRef.current;
    data.drawMode = !data.drawMode;
    data.dotMarkers.forEach((marker) => {
      marker.K = data.drawMode;
    });
    setDrawMode(data.drawMode);
    if (drawMode) {
      setDots(data.dots);

      form.setValue(
        'course',
        data.dots.map((dots) => ({
          La: dots.Ma,
          Ma: dots.La,
        }))
      );
      form.setValue('distance', Math.round(data.polyLine.getLength() / 1000));
    }
  };

  const submit = async () => {
    const url = '/api/courses';
    const res = await fetchWithRetry(url, {
      method: 'POST',
      body: JSON.stringify(form.getValues()),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!res?.ok) throw new Error('코스 등록 실패');
    location.reload();
  };
  return (
    <div>
      <div>
        <Button onClick={toggleMode}>
          {drawMode ? '확정' : '그리기/수정'}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <FormField
            control={form.control}
            name="course"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="course">정보</FormLabel>
                <FormControl>
                  {!drawMode && (
                    <div>
                      <h1>좌표: {dots.length}개</h1>
                      <h1>
                        거리: {mapRef.current?.data.polyLine.getLength() / 1000}
                        km
                      </h1>
                    </div>
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="difficulty">difficulty</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">완료</Button>
        </form>
      </Form>
    </div>
  );
}
