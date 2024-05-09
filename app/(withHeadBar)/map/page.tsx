import { Map } from '@components';
import MapMenu from './mapMenu';

export default function Home() {
  return (
    <div className="w-full h-full">
      <MapMenu />
      <Map />
    </div>
  );
}
