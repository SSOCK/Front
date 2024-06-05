'use client';

import { useState } from 'react';
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

const WritePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: '1자이상 100자이하로 입력해주세요.' })
    .max(100, { message: '1자이상 100자이하로 입력해주세요.' }),
  content: z.string().max(2000, { message: '2000자이하로 입력해주세요.' }),
});

export default function WritePost() {
  const [warning, setWarning] = useState(false);

  const WritePostForm = useForm<z.infer<typeof WritePostSchema>>({
    resolver: zodResolver(WritePostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const writePostSubmit = (data: z.infer<typeof WritePostSchema>) => {};

  const reset = () => {};

  return (
    <>
      <HeadBar />

      <div className="mainPart p-5 flex flex-col items-center justify-between">
        <div className="flex flex-col bg-slate-300 p-5 rounded-md shadow-xl w-full">
          <Form {...WritePostForm}>
            <form
              onSubmit={WritePostForm.handleSubmit(writePostSubmit)}
              onChange={reset}
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

              <Button type="submit" className="h-12 w-full">
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
