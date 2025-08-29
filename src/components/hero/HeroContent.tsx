// Placeholder component to fix import errors
import React from 'react';

export const HeroContent: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return <div className="hero-content">{children}</div>;
};

export default HeroContent;
