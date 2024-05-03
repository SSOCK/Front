import HeadBar from '@/components/headBar';

export default function HeaderRayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      <HeadBar />
      {children}
    </div>
  );
}
