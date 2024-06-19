import { useEffect, useState } from 'react';
import { MyMap, LatLng } from '@/app/map/page';

interface ArroundCourseProps {
  mapRef: React.MutableRefObject<MyMap | undefined>;
}

export default function AroundCourse({ mapRef }: ArroundCourseProps) {
  const [center, setCenter] = useState<LatLng>();
  useEffect(() => {
    if (!mapRef.current) return;
    const myMap = mapRef.current;
    setCenter(myMap.map.getCenter());

    //idle은 화면 이동이나 축소확대시, 움직이는 동안은 x
    const event = () => {
      console.log('test');
      setCenter(myMap.map.getCenter());
    };
    myMap.maps.event.addListener(myMap.map, 'idle', event);

    return () => {
      myMap.maps.event.removeListener(myMap.map, 'idle', event);
    };
  }, [mapRef]);
  return <div>{center ? `${center.La},${center.Ma}` : 'none'}</div>;
}
