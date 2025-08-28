'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
  icon?: React.ReactNode;
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  className,
  rows = 4,
  options = [],
  icon,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message || error?.type;

  const inputClassName = cn(
    'w-full px-4 py-3 border rounded-lg transition-colors duration-200',
    'focus:ring-2 focus:ring-[#C9974D] focus:border-[#C9974D] focus:outline-none',
    icon && 'pl-12',
    error ? 'border-red-500' : 'border-gray-300',
    className
  );

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...register(name)}
            rows={rows}
            placeholder={placeholder}
            className={inputClassName}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        );

      case 'select':
        return (
          <select
            {...register(name)}
            className={inputClassName}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map(option => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  {...register(name)}
                  type="radio"
                  value={option.value}
                  className="mr-2 text-[#C9974D] focus:ring-[#C9974D]"
                  aria-describedby={error ? `${name}-error` : undefined}
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center cursor-pointer">
            <input
              {...register(name)}
              type="checkbox"
              className="mr-2 text-[#C9974D] focus:ring-[#C9974D] rounded"
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            <span className="text-gray-700">{placeholder}</span>
          </label>
        );

      default:
        return (
          <input
            {...register(name)}
            type={type}
            placeholder={placeholder}
            className={inputClassName}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        );
        }
};

  return (
    <div className="space-y-2">
      {type !== 'checkbox' && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        )}
        {renderInput()}
      </div>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600 mt-1">
          {errorMessage as string}
        </p>
      )}
    </div>
  );
}
