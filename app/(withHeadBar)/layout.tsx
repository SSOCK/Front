import HeadBar from '@/components/headBar';
import Navigation from '@/components/navigation';

export default function HeaderRayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col">
      <HeadBar />
      <div className="flex-grow overflow-y-scroll">{children}</div>
      <Navigation />
    </div>
  );
}
