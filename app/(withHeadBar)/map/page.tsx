import Map from '@/components/map';
import MapMenu from './mapMenu';

export default function Home() {
  return (
    <div className="w-full h-full">
      <MapMenu />
      <Map />
    </div>
  );
}
