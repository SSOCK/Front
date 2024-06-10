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
    confirm: z.string(),
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

  const [emailDescriptionReset, setEmailDescriptionReset] = useState(true);
  const [userNameDescriptionReset, setUserNameDescriptionReset] =
    useState(true);
  const [userNameError, setUserNameError] = useState<string>('');
  const [signUpError, setSignUpError] = useState<string>('');

  const EmailForm = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const PasswordForm = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });

  const UserNameForm = useForm<z.infer<typeof UserNameFormSchema>>({
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
    setEmailDescriptionReset(false);
    // 인증 시 에러 컨트롤 필요 (ex. setUserNameWarning)
  };

  const passwordSubmit = (data: z.infer<typeof PasswordFormSchema>) =>
    setPassword(data.password);

  const userNameSubmit = async (data: z.infer<typeof UserNameFormSchema>) => {
    try {
      const res = await fetch(`/api/auth/valid/user/${data.userName}`, {
        method: 'get',
      });

      if (res.status !== 200) throw 'PostError';

      const response = await res.json();
      if (!('exists' in response)) throw 'PostError';
      if (response['exists']) throw 'Duplicate';

      setUserName(data.userName);
      setUserNameDescriptionReset(false);
    } catch (error) {
      error === 'Duplicate'
        ? setUserNameError('이미 사용중인 닉네임입니다.')
        : setUserNameError('중복확인을 다시 시도해주십시오.');
    }
  };

  const nameSubmit = (data: z.infer<typeof NameFormSchema>) =>
    setName(data.name);

  const reset = () => {
    setUserNameError('');
    setSignUpError('');
  };

  const emailReset = () => {
    setEmail('');
    setEmailDescriptionReset(true);
  };

  const passwordReset = () => setPassword('');

  const userNamenReset = () => {
    setUserName('');
    setUserNameDescriptionReset(true);
  };

  const signUp = async () => {
    if (!email || !password || !name) {
      setSignUpError('입력 항목이 모두 채워지지 않았습니다.');
      return;
    } else if (!userName) {
      setSignUpError('닉네임이 인증되지 않았습니다.');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
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
      });

      if (res.status !== 201) throw res.status;
      alert('회원가입이 완료되었습니다. 로그인 창으로 이동합니다.');
      router.push('/signin');
    } catch (error) {
      error === 409
        ? setSignUpError('이미 존재하는 사용자입니다.')
        : setSignUpError('회원가입을 다시 시도해주십시오');
    }
  };

  return (
    <div className="flex flex-col p-8 gap-4 items-center">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <Form {...EmailForm}>
        <form
          onSubmit={EmailForm.handleSubmit(emailSubmit)}
          onChange={() => {
            reset();
            emailReset();
          }}
          className="w-full"
        >
          <FormField
            control={EmailForm.control}
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
                  {emailDescriptionReset
                    ? '로그인시 사용할 이메일을 입력해주세요.'
                    : '인증이 완료되었습니다.'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...PasswordForm}>
        <form
          onChange={() => {
            PasswordForm.handleSubmit(passwordSubmit)();
            reset();
            passwordReset();
          }}
          className="w-full"
        >
          <FormField
            control={PasswordForm.control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input
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

          <div className="pt-4" />
          <FormField
            control={PasswordForm.control}
            name="confirm"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="flex gap-1">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                </div>
                <FormDescription>비밀번호를 다시 입력해주세요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...UserNameForm}>
        <form
          onSubmit={UserNameForm.handleSubmit(userNameSubmit)}
          onChange={() => {
            reset();
            userNamenReset();
          }}
          className="w-full"
        >
          <FormField
            control={UserNameForm.control}
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
                <FormDescription>
                  {userNameDescriptionReset
                    ? '보여질 닉네임을 설정해주세요.'
                    : '인증이 완료되었습니다.'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {userNameError.length ? (
        <div className="text-red-500">{userNameError}</div>
      ) : null}

      <Form {...NameForm}>
        <form
          onChange={() => {
            NameForm.handleSubmit(nameSubmit)();
            reset();
          }}
          className="w-full"
        >
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

      {signUpError.length ? (
        <div className="text-red-500">{signUpError}</div>
      ) : null}
    </div>
  );
}
