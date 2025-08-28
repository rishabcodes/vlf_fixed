'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

// Honeypot field for spam protection
export function HoneypotField() {
  const { register } = useFormContext();

  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      <input
        {...register('website')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        placeholder="Leave this field empty"
      />
    </div>
  );
}
