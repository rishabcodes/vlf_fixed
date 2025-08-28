import React from 'react';
import { Section as BaseSection } from '@/design-system/components/Section';
import { Card as BaseCard } from '@/design-system/components/Card';
import { Heading as BaseHeading, Text as BaseText } from '@/design-system/components/Typography';
import type { CSSProperties } from 'react';

// Extended Section component that supports style prop
interface ExtendedSectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'alt' | 'dark' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export const Section: React.FC<ExtendedSectionProps> = ({ style, ...props }) => {
  const styleAttr = style ? { style } : {};
  return (
    <div {...styleAttr}>
      <BaseSection {...props} />
    </div>
  );
};

// Extended Card component that supports style prop
interface ExtendedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: CSSProperties;
}

export const Card: React.FC<ExtendedCardProps> = ({ style, ...props }) => {
  const styleAttr = style ? { style } : {};
  return (
    <div {...styleAttr}>
      <BaseCard {...props} />
    </div>
  );
};

// Extended Heading component that supports style prop
interface ExtendedHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: '7xl' | '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'white';
  className?: string;
  animate?: boolean;
  style?: CSSProperties;
}

export const Heading: React.FC<ExtendedHeadingProps> = ({ style, ...props }) => {
  if (style) {
    return (
      <BaseHeading {...props} className={`${props.className || ''}`}>
        <span style={style}>{props.children}</span>
      </BaseHeading>
    );
  }
  return <BaseHeading {...props} />;
};

// Extended Text component that supports style prop
interface ExtendedTextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'white';
  className?: string;
  style?: CSSProperties;
}

export const Text: React.FC<ExtendedTextProps> = ({ style, ...props }) => {
  if (style) {
    return (
      <BaseText {...props} className={`${props.className || ''}`}>
        <span style={style}>{props.children}</span>
      </BaseText>
    );
  }
  return <BaseText {...props} />;
};
