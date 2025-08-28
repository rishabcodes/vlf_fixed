import { useEffect, useState } from 'react';

export function useTextScramble(text: string, duration: number = 2000) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    setDisplayText(text);
  }, [text]);
  
  return displayText;
}
