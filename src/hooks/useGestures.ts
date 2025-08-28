import { useState } from 'react';

export function useGestures() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handlers = {
    onMouseDown: () => setIsDragging(true),
    onMouseUp: () => setIsDragging(false),
    onMouseMove: (e: React.MouseEvent) => {
      if (isDragging) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
      }
};
  
  return {
    isDragging,
    position,
    handlers
  };
}
