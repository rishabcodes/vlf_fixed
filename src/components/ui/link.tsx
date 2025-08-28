import React, { forwardRef } from 'react';
import NextLink from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const linkVariants = cva(
  'transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: ['text-primary hover:text-primary-600', 'underline-offset-4 hover:underline'],
        muted: ['text-neutral-600 hover:text-neutral-900', 'underline-offset-4 hover:underline'],
        nav: [
          'text-neutral-700 hover:text-primary',
          'font-medium relative',
          'after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0',
          'after:bg-primary after:transition-all hover:after:w-full',
        ],
        button: [
          'inline-flex items-center justify-center',
          'bg-primary text-primary-foreground',
          'hover:bg-primary-600 active:bg-primary-700',
          'font-medium px-4 py-2 rounded-md',
          'shadow-sm hover:shadow-md',
        ],
        ghost: [
          'text-neutral-700 hover:text-neutral-900',
          'hover:bg-neutral-100 px-2 py-1 rounded',
        ],
      },
      size: {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      underline: {
        always: 'underline',
        hover: 'hover:underline',
        none: 'no-underline hover:no-underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
      underline: 'hover',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, underline, href, external = false, children, ...props }, ref) => {
    const isExternal = external || href.startsWith('http');

    if (isExternal) {
      return (
        <a
          ref={ref}

                href={href}

                className={cn(linkVariants({ variant, size, underline, className }))}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
          {variant !== 'button' && (
            <svg
              className="inline-block ml-1 h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </a>
      );
    }

    return (
      <NextLink
        ref={ref}

                href={href}

                className={cn(linkVariants({ variant, size, underline, className }))}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export { Link, linkVariants };
