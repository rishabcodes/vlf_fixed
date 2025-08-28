import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary-600 active:bg-primary-700',
          'focus-visible:ring-primary',
          'shadow-sm hover:shadow-md',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary-600 active:bg-secondary-800',
          'focus-visible:ring-secondary',
          'shadow-sm hover:shadow-md',
        ],
        outline: [
          'border-2 border-primary bg-transparent text-primary',
          'hover:bg-primary hover:text-primary-foreground',
          'focus-visible:ring-primary',
        ],
        ghost: [
          'bg-transparent text-neutral-700',
          'hover:bg-neutral-100 hover:text-neutral-900',
          'focus-visible:ring-neutral-400',
        ],
        destructive: [
          'bg-error text-white',
          'hover:bg-error-dark',
          'focus-visible:ring-error',
          'shadow-sm hover:shadow-md',
        ],
        link: [
          'bg-transparent text-primary underline-offset-4',
          'hover:underline hover:text-primary-600',
          'focus-visible:ring-primary',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-md gap-2',
        md: 'h-10 px-4 text-base rounded-md gap-2',
        lg: 'h-12 px-6 text-lg rounded-lg gap-3',
        xl: 'h-14 px-8 text-xl rounded-lg gap-3',
        icon: 'h-10 w-10 rounded-md',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

type ButtonOrAnchorProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps extends ButtonOrAnchorProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  as?: React.ElementType;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      as,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      href,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {loading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </>
    );

    const commonClasses = cn(buttonVariants({ variant, size, fullWidth, className }));

    if (as) {
      const Component = as;
      return React.createElement(
        Component,
        {
          className: commonClasses,
          ref: ref,
          disabled: disabled || loading,
          ...props,
        },
        content
      );
    }

    if (href) {
      // Filter out button-specific props for anchor element
      const { type, ...anchorProps } = props as any;
      return (
        <a
          className={commonClasses}
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        className={commonClasses}
        ref={ref}
        disabled={disabled || loading}
        type="button"
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
}
}
