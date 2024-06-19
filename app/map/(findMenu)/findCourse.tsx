'use client';

import { useState } from 'react';
import { MyMap } from '@/app/map/page';
import AroundCourse from './aroundCourse';
import SearchInput from './searchInput';

interface FindCourseProps {
  mapRef: React.MutableRefObject<MyMap | undefined>;
}

export default function FindCourse({ mapRef }: FindCourseProps) {
  const [nowPlace, setNowPlace] = useState('제주시 아라1동');
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col p-3 gap-6">
        <SearchInput />
        <h3 className="font-bold text-lg">{nowPlace}</h3>
      </div>
      <div className="grow overflow-y-scroll scroll">
        <AroundCourse mapRef={mapRef} setNowPlace={setNowPlace} />
      </div>
    </div>
  );
}
