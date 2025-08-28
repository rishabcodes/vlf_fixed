'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked,
      onCheckedChange,
      defaultChecked = false,
      label,
      labelPosition = 'right',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);

    // Use controlled value if provided, otherwise use internal state
    const checkedState = checked !== undefined ? checked : isChecked;

    const handleClick = () => {
      const newChecked = !checkedState;
      if (checked === undefined) {
        setIsChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const switchButton = (
      <button
        ref={ref}

                type="button"
        role="switch"
        aria-checked={checkedState} data-state={checkedState ? 'checked' : 'unchecked'} disabled={disabled} className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
          checkedState ? 'bg-primary' : 'bg-input',
          className
        )}

                onClick={handleClick}
        {...props}
      >
        <span
          data-state={checkedState ? 'checked' : 'unchecked'} className={cn(
            'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
            checkedState ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    );

    if (!label) {
      return switchButton;
    }

    return (
      <div className="flex items-center space-x-2">
        {labelPosition === 'left' && (
          <label
            htmlFor={props.id} className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              disabled && 'cursor-not-allowed opacity-70'
            )}
          >
            {label}
          </label>
        )}
        {switchButton}
        {labelPosition === 'right' && (
          <label
            htmlFor={props.id} className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              disabled && 'cursor-not-allowed opacity-70'
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };