'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn';

const UserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: '3자이상 20자이하로 입력해주세요.' })
    .max(20, { message: '3자이상 20자이하로 입력해주세요.' }),
});

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

export default function LoginPage() {
  const userNameForm = useForm<z.infer<typeof UserNameFormSchema>>({
    resolver: zodResolver(UserNameFormSchema),
    defaultValues: {
      username: '',
    },
  });
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

  const onSubmit = (data: z.infer<typeof UserNameFormSchema>) => {
    alert(JSON.stringify(data));
  };
  const emailSubmit = (data: z.infer<typeof EmailFormSchema>) => {
    alert(`${JSON.stringify(data)} 인증하기`);
  };
  const passwordSubmit = (data: z.infer<typeof PasswordFormSchema>) => {
    //alert(`${JSON.stringify(data)} 비번맞냐`);
  };
  return (
    <div className="flex flex-col p-8 gap-4 items-center">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <Form {...emailForm}>
        <form onSubmit={emailForm.handleSubmit(emailSubmit)} className="w-full">
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
          ></FormField>
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
        <form onSubmit={userNameForm.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={userNameForm.control}
            name="username"
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
          ></FormField>
        </form>
      </Form>
      <Button className="h-12 w-full">Sign in</Button>
    </div>
  );
}
