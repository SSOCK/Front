import Image from 'next/image';
import Link from 'next/link';
import { Button, Checkbox, Input, Label } from '@shadcn';

export default function LoginPage() {
  return (
    <div className="flex flex-col p-8 gap-4 items-center">
      <Image src="/img/testPhoto.jpg" alt="logo" width={150} height={150} />
      <h2 className="text-2xl font-bold">Sign in</h2>
      <Input type="email" placeholder="Email" className="h-12" />
      <Input type="password" placeholder="password" className="h-12" />
      <div className="flex align-middle gap-1 w-full justify-start">
        <Checkbox id="rememberLogin" />
        <Label htmlFor="rememberLogin">Remember me</Label>
      </div>
      <Button className="h-12 w-full">Sign in</Button>
      <div className="flex gap-1">
        <h5>Don&apos;t have an account?</h5>
        <Link href="/signUp" className="underline font-bold">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
