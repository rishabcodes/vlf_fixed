'use client';

import { useState, useEffect } from 'react';

interface SEOMetrics {
  pageTitle: string;
  metaDescription: string;
  h1Count: number;
  h2Count: number;
  imageAltMissing: number;
  schemaPresent: boolean;
  canonicalUrl: string | null;
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
  loadTime: number;
}

export function SEOMonitor() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const analyzePageSEO = () => {
      const title = document.title;
      const metaDesc =
        document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const h1s = document.querySelectorAll('h1').length;
      const h2s = document.querySelectorAll('h2').length;
      const images = document.querySelectorAll('img');
      const missingAlt = Array.from(images).filter(img => !img.alt).length;
      const schemas = document.querySelectorAll('script[type="application/ld+json"]').length > 0;
      const canonical =
        document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
      const links = document.querySelectorAll('a[href]');
      const internalLinks = Array.from(links).filter(link => {
        const href = link.getAttribute('href') || '';
        return href.startsWith('/') || href.includes(window.location.hostname);
      }).length;
      const externalLinks = links.length - internalLinks;
      const text = document.body.innerText || '';
      const wordCount = text.trim().split(/\s+/).length;
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

      setMetrics({
        pageTitle: title,
        metaDescription: metaDesc,
        h1Count: h1s,
        h2Count: h2s,
        imageAltMissing: missingAlt,
        schemaPresent: schemas,
        canonicalUrl: canonical,
        internalLinks,
        externalLinks,
        wordCount,
        loadTime,
      });
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      analyzePageSEO();
    } else {
      window.addEventListener('load', analyzePageSEO);
      return () => window.removeEventListener('load', analyzePageSEO);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development' || !metrics) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateSEOScore = () => {
    let score = 100;

    // Title checks
    if (metrics.pageTitle.length < 30) score -= 10;
    if (metrics.pageTitle.length > 60) score -= 5;

    // Meta description checks
    if (metrics.metaDescription.length < 120) score -= 10;
    if (metrics.metaDescription.length > 160) score -= 5;

    // Content structure
    if (metrics.h1Count === 0) score -= 20;
    if (metrics.h1Count > 1) score -= 10;
    if (metrics.h2Count < 2) score -= 5;

    // Images
    if (metrics.imageAltMissing > 0) score -= metrics.imageAltMissing * 2;

    // Schema
    if (!metrics.schemaPresent) score -= 15;

    // Content length
    if (metrics.wordCount < 300) score -= 15;

    // Performance
    if (metrics.loadTime > 3000) score -= 10;

    return Math.max(0, score);
  };

  const seoScore = calculateSEOScore();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}

                className="bg-[#6B1F2E] text-white p-3 rounded-full shadow-lg hover:bg-[#8B2635] transition-all"
        title="SEO Monitor"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </button>

      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl p-6 w-96 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#6B1F2E]">SEO Monitor</h3>
            <span className={`text-2xl font-bold ${getScoreColor(seoScore)}`}>{seoScore}/100</span>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div className="border-b pb-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-1">
                Page Title ({metrics.pageTitle.length} chars)
              </h4>
              <p className="text-xs text-gray-600">{metrics.pageTitle}</p>
              {(metrics.pageTitle.length < 30 || metrics.pageTitle.length > 60) && (
                <p className="text-xs text-red-600 mt-1">⚠️ Ideal length: 30-60 characters</p>
              )}
            </div>

            {/* Meta Description */}
            <div className="border-b pb-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-1">
                Meta Description ({metrics.metaDescription.length} chars)
              </h4>
              <p className="text-xs text-gray-600">{metrics.metaDescription}</p>
              {(metrics.metaDescription.length < 120 || metrics.metaDescription.length > 160) && (
                <p className="text-xs text-red-600 mt-1">⚠️ Ideal length: 120-160 characters</p>
              )}
            </div>

            {/* Content Structure */}
            <div className="border-b pb-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Content Structure</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className={metrics.h1Count === 1 ? 'text-green-600' : 'text-red-600'}>
                    H1 Tags: {metrics.h1Count}
                  </span>
                </div>
                <div>
                  <span className={metrics.h2Count >= 2 ? 'text-green-600' : 'text-yellow-600'}>
                    H2 Tags: {metrics.h2Count}
                  </span>
                </div>
                <div>
                  <span className={metrics.wordCount >= 300 ? 'text-green-600' : 'text-red-600'}>
                    Words: {metrics.wordCount}
                  </span>
                </div>
                <div>
                  <span className={metrics.loadTime < 3000 ? 'text-green-600' : 'text-red-600'}>
                    Load: {(metrics.loadTime / 1000).toFixed(2)}s
                  </span>
                </div>
              </div>
            </div>

            {/* Technical SEO */}
            <div className="border-b pb-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Technical SEO</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <span className={metrics.schemaPresent ? 'text-green-600' : 'text-red-600'}>
                    {metrics.schemaPresent ? '✓' : '✗'} Schema Markup
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={metrics.canonicalUrl ? 'text-green-600' : 'text-yellow-600'}>
                    {metrics.canonicalUrl ? '✓' : '⚠'} Canonical URL
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className={metrics.imageAltMissing === 0 ? 'text-green-600' : 'text-red-600'}
                  >
                    {metrics.imageAltMissing === 0 ? '✓' : '✗'} Image Alt Tags (
                    {metrics.imageAltMissing} missing)
                  </span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="border-b pb-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Links Analysis</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Internal: {metrics.internalLinks}</div>
                <div>External: {metrics.externalLinks}</div>
              </div>
            </div>

            {/* Recommendations */}
            {seoScore < 90 && (
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Recommendations</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {metrics.h1Count === 0 && <li>• Add exactly one H1 tag</li>}
                  {metrics.h1Count > 1 && <li>• Use only one H1 tag per page</li>}
                  {metrics.wordCount < 300 && <li>• Add more content (min 300 words)</li>}
                  {!metrics.schemaPresent && <li>• Add Schema.org structured data</li>}
                  {metrics.imageAltMissing > 0 && <li>• Add alt text to all images</li>}
                  {metrics.loadTime > 3000 && <li>• Optimize page load speed</li>}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/sitemap.xml"
                target="_blank"
                className="text-xs text-[#C9974D] hover:underline"
              >
                View Sitemap
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                className="text-xs text-[#C9974D] hover:underline"
              >
                View Robots.txt
              </a>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C9974D] hover:underline"
              >
                Search Console
              </a>
              <a
                href="https://pagespeed.web.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C9974D] hover:underline"
              >
                PageSpeed Test
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
