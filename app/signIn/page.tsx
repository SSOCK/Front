'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';

export default function SignInPage() {
  const router = useRouter();
  const [empty, setEmpty] = useState(false);
  const [warning, setWarning] = useState(false);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const reset = () => {
    setEmpty(false);
    setWarning(false);
  };

  const signIn = () => {
    if (!email.current!.value || !password.current!.value) {
      setEmpty(true);
      return;
    } else setEmpty(false);

    fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: email.current!.value,
        password: password.current!.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data['access-token']) {
          setCookie('access-token', data['access-token']);
          setCookie('refresh-token', data['refresh-token']);
          router.push('/');
        } else setWarning(true);
      });
  };

  return (
    <div className="flex flex-col p-8 gap-4 items-center">
      <Image src="/img/testPhoto.jpg" alt="logo" width={150} height={150} />
      <h2 className="text-2xl font-bold">Sign in</h2>

      <Input
        ref={email}
        type="email"
        placeholder="Email"
        className="h-12"
        onChange={reset}
      />
      <Input
        ref={password}
        type="password"
        placeholder="password"
        className="h-12"
        onChange={reset}
      />

      <div className="flex align-middle gap-1 w-full justify-start">
        <Checkbox id="rememberLogin" />
        <Label htmlFor="rememberLogin">Remember me</Label>
      </div>

      <Button className="h-12 w-full" onClick={signIn}>
        Sign in
      </Button>

      {empty ? (
        <div className="text-red-500">아이디와 비밀번호를 입력해주세요.</div>
      ) : null}
      {warning ? (
        <div className="text-red-500">
          아이디와 비밀번호를 다시 입력해주세요.
        </div>
      ) : null}

      <div className="flex gap-1">
        <h5>Don&apos;t have an account?</h5>
        <Link href="/signUp" className="underline font-bold">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
