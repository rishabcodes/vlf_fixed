'use client';

import Link from 'next/link';
import { ReactNode, CSSProperties } from 'react';

interface InteractiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
}

export function InteractiveLink({
  href,
  children,
  className,
  style,
  hoverStyle,
}: InteractiveLinkProps) {
  return (
    <Link
      href={href}

                className={className}

                style={style}
                onMouseEnter={e => {
        if (hoverStyle) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }}
                onMouseLeave={e => {
        if (style) {
          Object.assign(e.currentTarget.style, style);
        }}
    >
      {children}
    </Link>
  );
}

interface InteractiveButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  target?: string;
  rel?: string;
}

export function InteractiveButton({
  href,
  children,
  className,
  style,
  hoverStyle,
  target,
  rel,
}: InteractiveButtonProps) {
  return (
    <a
      href={href}

                className={className}

                style={style}
      target={target}
      rel={rel}
                onMouseEnter={e => {
        if (hoverStyle) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }}
                onMouseLeave={e => {
        if (style) {
          Object.assign(e.currentTarget.style, style);
        }}
    >
      {children}
    </a>
  );
}
}
}
}
}
