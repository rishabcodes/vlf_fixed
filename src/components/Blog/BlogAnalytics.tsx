'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/safe-logger';
import { usePathname } from 'next/navigation';

// Use global gtag and fbq types

interface BlogAnalyticsProps {
  postSlug?: string;
  language: 'en' | 'es';
  action: 'view' | 'share' | 'click';
  category?: string;
}

export function BlogAnalytics({ postSlug, language, action, category }: BlogAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track blog interactions
    const trackEvent = () => {
      // Google Analytics 4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: 'Blog',
          event_label: postSlug || 'blog_listing',
          language: language,
          page_location: window.location.href,
          page_title: document.title,
          practice_area: category,
          custom_map: {
            custom_parameter_1: 'yo_peleo_blog',
          },
        });
      }

      // Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_type: 'blog_post',
          content_ids: [postSlug || 'blog_listing'],
          content_name: document.title,
          content_category: category || 'legal_blog',
          language: language,
        });
      }

      // Internal analytics
      fetch('/api/analytics/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          postSlug,
          language,
          category,
          pathname,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      }).catch(err => logger.error('Analytics error:', err));
    };

    // Track after component mounts
    const timer = setTimeout(trackEvent, 1000);

    return () => clearTimeout(timer);
  }, [postSlug, language, action, category, pathname]);

  return null; // This is a tracking component, no UI
}

// Blog reading progress tracker
export function BlogReadingProgress({ contentId }: { contentId: string }) {
  useEffect(() => {
    const startTime = Date.now();
    let maxScroll = 0;
    const readingMilestones: number[] = [];

    const trackReadingProgress = () => {
      const content = document.getElementById(contentId);
      if (!content) return;

      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = content.offsetHeight;

      const scrollPercent = Math.round((scrollTop / (docHeight - windowHeight)) * 100);

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        // Track reading milestones (25%, 50%, 75%, 100%)
        const milestones = [25, 50, 75, 100];
        for (const milestone of milestones) {
          if (scrollPercent >= milestone && !readingMilestones.includes(milestone)) {
            readingMilestones.push(milestone);

            // Track milestone
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'scroll', {
                event_category: 'Blog Reading',
                event_label: `${milestone}% read`,
                value: milestone,
                custom_map: {
                  reading_progress: milestone,
                },
              });
            }}
          }
};

    const handleScroll = () => {
      requestAnimationFrame(trackReadingProgress);
    };

    // Track time spent reading
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'blog_reading_time',
          value: timeSpent,
          event_category: 'Blog Engagement',
        });
      }

      // Send reading analytics
      fetch('/api/analytics/blog-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId,
          timeSpent,
          maxScrollPercent: maxScroll,
          milestones: readingMilestones,
          completed: maxScroll >= 90,
        }),
      }).catch(() => {}); // Silent fail
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload(); // Track on component unmount too
    };
  }, [contentId]);

  return null;
}

// Social sharing tracker
export function trackSocialShare(platform: string, postSlug: string, language: 'en' | 'es') {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: 'blog_post',
      content_id: postSlug,
      language: language,
      event_category: 'Blog Social Share',
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Share', {
      content_type: 'blog_post',
      content_id: postSlug,
      method: platform,
    });
  }

  // Internal tracking
  fetch('/api/analytics/blog-share', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      platform,
      postSlug,
      language,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {});
}
}
