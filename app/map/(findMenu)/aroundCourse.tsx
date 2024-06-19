import { useEffect, useRef, useState } from 'react';
import { fetchWithRetry } from '@utils/fetch';
import { MyMap, LatLng } from '@/app/map/page';

interface ArroundCourseProps {
  mapRef: React.MutableRefObject<MyMap | undefined>;
}
type CourseInfo = {
  course: { latitude: number; longitude: number }[];
  id: number;
  title: string;
  distance: number;
  difficulty: number;
  member: {
    emeail: string;
    id: number;
    name: string;
    username: string;
  };
};

async function getCourses(latLng: LatLng) {
  const url = `/api/courses/radius?latitude=${latLng.Ma}&longitude=${latLng.La}&radius=1000`;
  const res = await fetchWithRetry(url, {
    method: 'get',
  });
  if (!res?.ok) return;
  return await res.json();
}

export default function AroundCourse({ mapRef }: ArroundCourseProps) {
  const [center, setCenter] = useState<LatLng>();
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const lineRef = useRef([]);
  useEffect(() => {
    if (!mapRef.current) return;
    const myMap = mapRef.current;
    setCenter(myMap.map.getCenter());

    //idle은 화면 이동이나 축소확대시, 움직이는 동안은 x
    const event = () => {
      setCenter(myMap.map.getCenter());
    };
    myMap.maps.event.addListener(myMap.map, 'idle', event);

    return () => {
      myMap.maps.event.removeListener(myMap.map, 'idle', event);
    };
  }, [mapRef]);

  useEffect(() => {
    console.log(center);
    if (!center) return;
    async function updateCourses(center: LatLng) {
      const data = (await getCourses(center)).courses as CourseInfo[];

      setCourses(data);
    }
    updateCourses(center);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);
  useEffect(() => {
    console.log(courses);
    //map에 코스추가~
    if (!mapRef.current) return;
    const myMap = mapRef.current;
    const paths = courses.map((c) =>
      c.course.map(
        ({ latitude, longitude }) => new myMap.maps.LatLng(latitude, longitude)
      )
    );
    console.log(paths, 'paths');
    var polyline = new myMap.maps.Polyline({
      map: myMap.map,
      path: [
        new myMap.maps.LatLng(33.452344169439975, 126.56878163224233),
        new myMap.maps.LatLng(33.452739313807456, 126.5709308145358),
        new myMap.maps.LatLng(33.45178067090639, 126.5726886938753),
      ],
      strokeWeight: 2,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
    });
    paths.forEach((path) => {
      console.log(path);
      const line = new myMap.maps.Polyline({
        map: myMap.map,
        path: path,
        strokeWeight: 5,
        strokeColor: '#ff6600',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
      });
    });
  }, [courses]);

  return <div>{center ? `${center.La},${center.Ma}` : 'none'}</div>;
}
