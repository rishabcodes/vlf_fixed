import { useState } from 'react';

export function useMagneticHover() {
  const [isHovered, setIsHovered] = useState(false);

  return {
    springs,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  };
}
