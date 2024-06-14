'use client';

import { useState } from 'react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`flex absolute z-50 w-96 top-0 h-full ease-in-out transition-transform duration-300 ${isOpen && '-translate-x-full'}`}
    >
      <div className="bg-white w-96 h-full border-r "></div>

      <button
        className="absolute right-0 translate-x-full top-1/2 bg-white h-12 border border-l-0 border-primary p-1 rounded-r font-bold text-primary"
        onClick={toggleIsOpen}
      >
        {isOpen ? `>` : '<'}
      </button>
    </div>
  );
}
