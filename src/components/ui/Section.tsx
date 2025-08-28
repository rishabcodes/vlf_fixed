import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id}

                className={cn('py-12 md:py-16 lg:py-20', className)}>
      {children}
    </section>
  );
}

export { Section };
