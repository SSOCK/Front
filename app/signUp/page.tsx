'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

const EmailFormSchema = z.object({
  email: z
    .string()
    .email({ message: '유효한 이메일을 입력해주세요.' })
    .max(50, { message: '50자 이하로 입력해주세요.' }),
});

const PasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: '6자이상 20자이하로 입력해주세요.' })
      .max(20, { message: '6자이상 20자이하로 입력해주세요.' }),
    confirm: z
      .string()
      .min(6, { message: '6자이상 20자이하로 입력해주세요.' })
      .max(20, { message: '6자이상 20자이하로 입력해주세요.' }),
  })
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

const UserNameFormSchema = z.object({
  userName: z
    .string()
    .min(3, { message: '3자이상 20자이하로 입력해주세요.' })
    .max(20, { message: '3자이상 20자이하로 입력해주세요.' }),
});

const NameFormSchema = z.object({
  name: z.string().max(30, { message: '30자이하로 입력해주세요.' }),
});

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [empty, setEmpty] = useState(false);
  const [warning, setWarning] = useState(false);

  const emailForm = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });

  const userNameForm = useForm<z.infer<typeof UserNameFormSchema>>({
    resolver: zodResolver(UserNameFormSchema),
    defaultValues: {
      userName: '',
    },
  });

  const NameForm = useForm<z.infer<typeof NameFormSchema>>({
    resolver: zodResolver(NameFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const emailSubmit = (data: z.infer<typeof EmailFormSchema>) => {
    alert(`${JSON.stringify(data)} 인증하기`);
    setEmail(data.email);
  };

  const passwordSubmit = (data: z.infer<typeof PasswordFormSchema>) => {
    //alert(`${JSON.stringify(data)} 비번맞냐`);
    setPassword(data.password);
  };

  const userNameSubmit = (data: z.infer<typeof UserNameFormSchema>) =>
    setUserName(data.userName);

  const nameSubmit = (data: z.infer<typeof NameFormSchema>) =>
    setName(data.name);

  const reset = () => {
    setEmpty(false);
    setWarning(false);
  };

  const signUp = () => {
    if (email === '' || password === '' || userName === '' || name === '') {
      setEmpty(true);
      return;
    }

    fetch('/api/signup', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        email,
        password,
        name,
      }),
    }).then((res) => {
      if (res.status === 200) {
        alert('회원가입이 완료되었습니다. 로그인 창으로 이동합니다.');
        router.push('/signIn');
      } else if (res.status === 400 || res.status === 409) setWarning(true);
    });
  };

  return (
    <div className="flex flex-col p-8 gap-4 items-center">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <Form {...emailForm}>
        <form
          onSubmit={emailForm.handleSubmit(emailSubmit)}
          onChange={reset}
          className="w-full"
        >
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <Button type="submit">인증</Button>
                </div>
                <FormDescription>
                  로그인시 사용할 이메일을 입력해주세요.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...passwordForm}>
        <form
          onChange={passwordForm.handleSubmit(passwordSubmit)}
          className="w-full"
        >
          <FormField
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </div>
                <FormDescription>비밀번호를 입력해주세요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </div>
                <FormDescription>비밀번호를 다시 입력해주세요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...userNameForm}>
        <form
          onSubmit={userNameForm.handleSubmit(userNameSubmit)}
          className="w-full"
        >
          <FormField
            control={userNameForm.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input placeholder="UserName" {...field} />
                  </FormControl>
                  <Button type="submit">중복확인</Button>
                </div>
                <FormDescription>보여질 닉네임을 설정해주세요.</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...NameForm}>
        <form onChange={NameForm.handleSubmit(nameSubmit)} className="w-full">
          <FormField
            control={NameForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                </div>
                <FormDescription>이름을 입력해주세요.</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Button className="h-12 w-full" onClick={signUp}>
        Sign in
      </Button>

      {empty ? (
        <div className="text-red-500">
          입력 항목이 모두 채워지지 않았습니다.
        </div>
      ) : null}
      {warning ? (
        <div className="text-red-500">회원가입을 다시 시도해주십시오.</div>
      ) : null}
    </div>
  );
}
