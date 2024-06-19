import React, { useEffect, useRef, useState } from 'react';
import { fetchWithRetry } from '@utils/fetch';
import { MyMap, LatLng } from '@/app/map/page';

interface ArroundCourseProps {
  mapRef: React.MutableRefObject<MyMap | undefined>;
  setNowPlace: React.Dispatch<React.SetStateAction<string>>;
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
  const url = `/api/courses/radius?latitude=${latLng.Ma}&longitude=${latLng.La}&radius=4999`;
  const res = await fetchWithRetry(url, {
    method: 'get',
  });
  if (!res?.ok) return;
  return await res.json();
}

const STROKE_COLOR = [
  '#FF0000',
  '#FFA500',
  '#FFFF00',
  '#008000',
  '#0000FF',
  '#00008B',
  '#800080',
];

export default function AroundCourse({
  mapRef,
  setNowPlace,
}: ArroundCourseProps) {
  const [center, setCenter] = useState<LatLng>({
    La: 126.570667,
    Ma: 33.450701,
  });
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const lineRef = useRef<any[]>([]);
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
    if (!center) return;
    async function updateCourses(center: LatLng) {
      const data = (await getCourses(center)).courses as CourseInfo[];

      setCourses(data);
    }
    updateCourses(center);
    if (!mapRef.current) return;
    const geocoder = new mapRef.current.maps.services.Geocoder();
    geocoder.coord2Address(center.La, center.Ma, (result: any, state: any) => {
      setNowPlace(
        `${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);

  useEffect(() => {
    //map에 코스추가~
    if (!mapRef.current) return;
    const myMap = mapRef.current;
    const paths = courses.map((c) =>
      c.course.map(
        ({ latitude, longitude }) => new myMap.maps.LatLng(latitude, longitude)
      )
    );

    if (lineRef.current.length) {
      lineRef.current.forEach((line) => {
        line.setMap(null);
      });
      lineRef.current = [];
    }

    lineRef.current = paths.map((path, index) => {
      return new myMap.maps.Polyline({
        map: myMap.map,
        path: path,
        strokeWeight: 5,
        strokeColor: STROKE_COLOR[index % STROKE_COLOR.length],
        strokeOpacity: 0.5,
        strokeStyle: 'solid',
      });
    });
  }, [courses, mapRef]);

  return (
    <div className="">
      {center &&
        courses.map((course) => {
          return (
            <div key={course.id} className="flex flex-col gap-2 p-5">
              <div className="w-full h-44 bg-gray-200 "></div>
              <h2 className="font-bold text-lg">{course.title}</h2>
              <div>
                <h3 className=" text-sm">거리 {course.distance / 1000}km</h3>
                <h3 className=" text-sm">난이도 {course.difficulty}</h3>
              </div>
            </div>
          );
        })}
    </div>
  );
}
