'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  text?: string;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
}

export function FormSubmitButton({
  isSubmitting,
  text = 'Submit',
  loadingText = 'Submitting...',
  className,
  disabled = false,
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled} className={cn(
        'w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold',
        'hover:bg-primary-600 transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center',
        className
      )}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}
