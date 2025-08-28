import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva('bg-white rounded-lg transition-all', {
  variants: {
    variant: {
      default: 'border border-neutral-200',
      elevated: 'shadow-md hover:shadow-lg',
      outline: 'border-2 border-neutral-300',
      filled: 'bg-neutral-50 border border-neutral-200',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    },
    interactive: {
      true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    interactive: false,
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'div' : 'div';

    return (
      <Comp
        ref={ref}

                className={cn(cardVariants({ variant, padding, interactive, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref}

                className={cn('space-y-1.5 p-6 pb-4', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

// Card Title Component
const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}

                className={cn(
        'text-2xl font-semibold leading-none tracking-tight text-neutral-900',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

// Card Description Component
const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref}

                className={cn('text-sm text-neutral-600', className)} {...props} />
));

CardDescription.displayName = 'CardDescription';

// Card Content Component
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref}

                className={cn('p-6 pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

// Card Footer Component
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref}

                className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

// Specialized Card Components

// Feature Card
export const FeatureCard = forwardRef<
  HTMLDivElement,
  CardProps & {
    icon?: React.ReactNode;
    title: string;
    description: string;
  }
>(({ icon, title, description, className, ...props }, ref) => (
  <Card ref={ref} variant="elevated" className={cn('group hover:shadow-xl', className)} {...props}>
    {icon && (
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
    )}
    <CardHeader className="p-0">
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-0 pt-2">
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
));

FeatureCard.displayName = 'FeatureCard';

// Testimonial Card
export const TestimonialCard = forwardRef<
  HTMLDivElement,
  CardProps & {
    quote: string;
    author: string;
    role?: string;
    rating?: number;
  }
>(({ quote, author, role, rating, className, ...props }, ref) => (
  <Card ref={ref} variant="filled" className={cn('relative', className)} {...props}>
    <CardContent>
      {rating && (
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}

                className={cn(
                'h-5 w-5',
                i < rating ? 'fill-gold-500 text-gold-500' : 'fill-neutral-200 text-neutral-200'
              )}

              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.458a1 1 0 00-.364 1.118l1.287 3.97c.3.92-.755 1.688-1.54 1.118l-3.38-2.458a1 1 0 00-1.175 0l-3.38 2.458c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.05 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          ))}
        </div>
      )}
      <blockquote className="text-lg text-neutral-700 italic mb-4">&quot;{quote}&quot;</blockquote>
      <div>
        <div className="font-semibold text-neutral-900">{author}</div>
        {role && <div className="text-sm text-neutral-600">{role}</div>}
      </div>
    </CardContent>
    <div className="absolute -top-2 -left-2 text-6xl text-primary-200 opacity-50">&quot;</div>
  </Card>
));

TestimonialCard.displayName = 'TestimonialCard';

// Stats Card
export const StatsCard = forwardRef<
  HTMLDivElement,
  CardProps & {
    value: string;
    label: string;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
  }
>(({ value, label, description, trend, className, ...props }, ref) => (
  <Card
    ref={ref}
    variant="default"
    padding="lg"
    className={cn('text-center', className)}
    {...props}
  >
    <div className="text-4xl font-bold text-primary mb-2">{value}</div>
    <div className="text-lg font-medium text-neutral-900">{label}</div>
    {description && <div className="text-sm text-neutral-600 mt-1">{description}</div>}
    {trend && (
      <div
        className={cn(
          'inline-flex items-center gap-1 mt-2 text-sm font-medium',
          trend === 'up' && 'text-success',
          trend === 'down' && 'text-error',
          trend === 'neutral' && 'text-neutral-600'
        )}
      >
        {trend === 'up' && '↑'}
        {trend === 'down' && '↓'}
        {trend === 'neutral' && '→'}
      </div>
    )}
  </Card>
));

StatsCard.displayName = 'StatsCard';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
