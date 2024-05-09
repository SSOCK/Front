import { HeadBar, Map, Navigation } from '@components';
import MapMenu from './mapMenu';

export default function Home() {
  return (
    <>
      <HeadBar />
      <main className="mainPart w-full h-full">
        <MapMenu />
        <Map />
      </main>
      <Navigation />
    </>
  );
}
