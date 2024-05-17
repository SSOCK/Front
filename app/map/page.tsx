import { HeadBar, Map, Navigation } from '@components';

export default function Home() {
  return (
    <>
      <HeadBar />
      <main className="mainPart w-full h-full">
        <Map />
      </main>
      <Navigation />
    </>
  );
}
