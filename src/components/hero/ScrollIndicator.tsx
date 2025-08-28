'use client';

import React from 'react';

export default function ScrollIndicator() {
  return (
    <div
className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-gray-400">Scroll</span>
        <div className="h-12 w-6 rounded-full border-2 border-gray-400">
          <div
className="mx-auto mt-2 h-2 w-1 rounded-full bg-[#C9974D]"
          />
        </div>
      </div>
    </div>
  );
}
