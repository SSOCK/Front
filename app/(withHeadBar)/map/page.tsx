import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      <h1>map page</h1>
    </main>
  );
}
