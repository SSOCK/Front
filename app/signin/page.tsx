'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from 'cookies-next';
import { z } from 'zod';
import { Checkbox } from '@components/ui/checkbox';
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
import { Label } from '@components/ui/label';
import { Button } from '@stories/Button';

const SignInFormSchema = z.object({
  email: z
    .string()
    .email({ message: '유효한 이메일을 입력해주세요.' })
    .max(50, { message: '50자 이하로 입력해주세요.' }),
  password: z
    .string()
    .min(6, { message: '6자이상 20자이하로 입력해주세요.' })
    .max(20, { message: '6자이상 20자이하로 입력해주세요.' }),
});

export default function SignInPage() {
  const router = useRouter();
  const remember = useRef<HTMLButtonElement>(null);
  const [warning, setWarning] = useState(false);

  const SignInForm = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInSubmit = async (data: z.infer<typeof SignInFormSchema>) => {
    try {
      const res = await fetch('/api/login', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (res.status !== 200) throw res.status;
      const response: { 'access-token': string; 'refresh-token': string } =
        await res.json();
      console.log('signin Done', response);
      sessionStorage.setItem(
        'access-token',
        `Bearer ${response['access-token']}`
      );

      const cookieOptions = {
        //httpOnly: true,
        path: '/api/auth/refresh',
        ...(remember.current!.getAttribute('data-state') === 'checked' && {
          maxAge: 60 * 60 * 24 * 7,
        }),
      };
      setCookie('refresh-token', `${response['refresh-token']}`, cookieOptions);
      router.push('/');
    } catch (error) {
      setWarning(true);
    }
  };

  const reset = () => setWarning(false);

  return (
    <div className="flex flex-col p-8 gap-4 items-center w-full max-w-2xl mx-auto">
      <Image src="/img/testPhoto.jpg" alt="logo" width={150} height={150} />
      <h2 className="text-2xl font-bold">Sign in</h2>

      <Form {...SignInForm}>
        <form
          onSubmit={SignInForm.handleSubmit(signInSubmit)}
          onChange={reset}
          className="w-full"
        >
          <FormField
            control={SignInForm.control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Email"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  로그인시 사용할 이메일을 입력해주세요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4" />
          <FormField
            control={SignInForm.control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                </div>
                <FormDescription>비밀번호를 입력해주세요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-8 pb-4 flex align-middle gap-1 w-full justify-start">
            <Checkbox id="rememberLogin" ref={remember} />
            <Label htmlFor="rememberLogin">Remember me</Label>
          </div>

          <Button
            id="signin"
            type="submit"
            label="Sign in"
            className="h-12 w-full"
          />
        </form>
      </Form>

      {warning ? (
        <div className="text-red-500">
          아이디와 비밀번호를 다시 입력해주세요.
        </div>
      ) : null}

      <div className="flex gap-1">
        <h5>Don&apos;t have an account?</h5>
        <Link href="/signup" className="underline font-bold">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
