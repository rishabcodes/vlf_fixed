'use client';

import Head from 'next/head';
import { useEffect } from 'react';
import { safeAppendChild, safeCreateElement } from '@/lib/dom/safe-dom';

interface ResourceHintsProps {
  criticalImages?: string[];
  criticalFonts?: string[];
  preconnectDomains?: string[];
  prefetchResources?: string[];
  preloadScripts?: string[];
  modulePreloadScripts?: string[];
  enableAutomaticOptimization?: boolean;
}

export default function ResourceHints({
  criticalImages = [],
  criticalFonts = [],
  preconnectDomains = [],
  prefetchResources = [],
  preloadScripts = [],
  modulePreloadScripts = [],
  enableAutomaticOptimization = true,
}: ResourceHintsProps) {
  useEffect(() => {
    if (!enableAutomaticOptimization) return;

    // Automatically add resource hints for discovered resources
    const addAutomaticHints = () => {
      // DNS prefetch for external images
      const images = document.querySelectorAll('img[src^="http"]');
      const imageDomains = new Set<string>();

      images.forEach(img => {
        try {
          const imgSrc = (img as HTMLImageElement).src;
          if (imgSrc && !imgSrc.includes('${')) {
            const url = new URL(imgSrc);
            if (url.hostname !== window.location.hostname) {
              imageDomains.add(url.origin);
            }
          }
        } catch (e) {
          // Invalid URL, ignore
        }
      });

      // Add DNS prefetch for discovered domains
      imageDomains.forEach(domain => {
        if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
          const link = safeCreateElement('link');
          if (link) {
            link.rel = 'dns-prefetch';
            link.href = domain;
            safeAppendChild(document.head, link);
          }
        }
      });

      // Preload visible images
      const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      };

      const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (!img.getAttribute('data-preloaded')) {
              // Create preload link for this image
              const link = safeCreateElement('link');
              if (link) {
                link.rel = 'preload';
                link.href = img.src;
                link.as = 'image';

                // Detect image format
                if (img.src.includes('.webp')) {
                  link.type = 'image/webp';
                } else if (img.src.includes('.avif')) {
                  link.type = 'image/avif';
                }

                safeAppendChild(document.head, link);
                img.setAttribute('data-preloaded', 'true');
              }
            }
            imageObserver.unobserve(img);
          }
        });
      }, observerOptions);

      // Observe images that aren\'t already critical
      const nonCriticalImages = document.querySelectorAll('img:not([data-critical])');
      nonCriticalImages.forEach(img => imageObserver.observe(img));

      // Prefetch links on hover
      const links = document.querySelectorAll(
        'a[href^="/"], a[href^="' + window.location.origin + '"]'
      );
      links.forEach(link => {
        let prefetchLink: HTMLLinkElement | null = null;

        const handleMouseEnter = () => {
          if (!prefetchLink) {
            prefetchLink = safeCreateElement('link');
            if (prefetchLink) {
              prefetchLink.rel = 'prefetch';
              prefetchLink.href = link.getAttribute('href') || '';
              safeAppendChild(document.head, prefetchLink);
            }
          }
        };

        link.addEventListener('mouseenter', handleMouseEnter, { once: true });
        link.addEventListener('touchstart', handleMouseEnter, { once: true });
      });
    };

    // Run after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addAutomaticHints);
    } else {
      addAutomaticHints();
    }
  }, [enableAutomaticOptimization]);

  return (
    <Head>
      {/* Preconnect to external domains */}
      {preconnectDomains.map(domain => (
        <link key={domain} rel="preconnect" href={domain} crossOrigin="anonymous" />
      ))}

      {/* DNS prefetch for additional domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Preload critical images */}
      {criticalImages.map(image => {
        const isWebP = image.includes('.webp');
        const isAVIF = image.includes('.avif');
        const type = isAVIF
          ? 'image/avif'
          : isWebP
            ? 'image/webp'
            : image.includes('.png')
              ? 'image/png'
              : undefined;

        return <link key={image} rel="preload" as="image" href={image} {...(type && { type })} />;
      })}

      {/* Preload critical fonts */}
      {criticalFonts.map(font => (
        <link
          key={font}
          rel="preload"
          as="font"
          type="font/woff2"
          href={font}
          crossOrigin="anonymous"
        />
      ))}

      {/* Preload critical scripts */}
      {preloadScripts.map(script => (
        <link key={script} rel="preload" href={script} as="script" />
      ))}

      {/* Module preload for ES modules */}
      {modulePreloadScripts.map(script => (
        <link key={script} rel="modulepreload" href={script} />
      ))}

      {/* Prefetch next likely pages */}
      <link rel="prefetch" href="/contact" />
      <link rel="prefetch" href="/practice-areas" />
      <link rel="prefetch" href="/attorneys/william-vasquez" />

      {/* Additional prefetch resources */}
      {prefetchResources.map(resource => (
        <link key={resource} rel="prefetch" href={resource} />
      ))}
    </Head>
  );
}
