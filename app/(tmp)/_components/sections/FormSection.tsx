'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// 폼 형식을 정의해야함
const formSchema = z.object({
  name: z.string().min(1, {
    message: '이름을 입력해주세요', // error 메세지 정의 최소 1글자
  }),
  email: z.string().email({
    message: '이메일 형식이 올바르지 않습니다', // error 메세지 정의
  }),
  age: z.number().int().min(1, {
    message: '나이를 입력해주세요', // error 메세지 정의
  }),
});

import Section from '@/app/(tmp)/_components/Section';

const FormSection = () => {
  // 정의한 폼 형식을 useForm에 적용
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // 초기값 정의
    defaultValues: {
      name: '',
      email: '',
      age: 0,
    },
  });

  const router = useRouter();

  const isLoading = form.formState.isSubmitting; // 로딩 상태

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    form.reset(); // 폼 초기화

    // 토스트 메세지 있다면,
    // toast.success('폼 제출 완료');

    // 캐싱된 데이터 refresh
    router.refresh();
  };

  // Form -> form -> FormField -> FormIten -> FormLabel -> FormControl -> FormMessage
  return (
    <>
      <Section title="Form">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name" // zod 에서 정의한 데이터 이름
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading} // 제출 중일 때 비활성화
                      placeholder="Please enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage /> {/* 에러 메세지 */}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Please enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Age</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Please enter your age"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Section>
    </>
  );
};

export default FormSection;
