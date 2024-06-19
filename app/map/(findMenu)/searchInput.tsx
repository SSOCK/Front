import { useState } from 'react';
import Find from '@/public/icons/find.svg';

export default function SearchInput() {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div
      className={`relative flex border-2 rounded-lg h-12 items-center justify-around gap-3 p-3 ${isFocus && 'border-primary'}`}
    >
      <Find className="size-5 fill-primary" />
      <input
        type="text"
        placeholder="장소 또는 코스명 검색"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className="grow focus:outline-none text-sm relative"
      />
      {isFocus && (
        <div className="w-[calc(100%+4px)] bottom-0 absolute border translate-y-[calc(100%-4px)] bg-white">
          <ul className="px-2">
            <li className="text-xs">검색 내역이 없습니다.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
