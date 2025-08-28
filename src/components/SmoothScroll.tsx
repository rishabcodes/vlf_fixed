'use client';

import { useEffect, useRef } from 'react';
// PERFORMANCE: GSAP commented out for performance optimization
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isBrowser, safeWindow } from '@/lib/utils/browser';

// PERFORMANCE: GSAP registration commented out
// if (isBrowser) {
//   gsap.registerPlugin(ScrollTrigger);
// }

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !contentRef.current) return;

    // Set up smooth scrolling
    const content = contentRef.current;

    // Set body height to content height
    const setBodyHeight = () => {
      document.body.style.height = `${content.scrollHeight}px`;
    };
    setBodyHeight();

    // Update on resize
    const resizeObserver = new ResizeObserver(setBodyHeight);
    resizeObserver.observe(content);

    // Smooth scroll animation
    gsap.to(content, {
      y: () => -(content.scrollHeight - safeWindow.innerHeight),
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={scrollRef}

                className="fixed inset-0 overflow-hidden">
      <div
                ref={contentRef}>{children}</div>
    </div>
  );
}
