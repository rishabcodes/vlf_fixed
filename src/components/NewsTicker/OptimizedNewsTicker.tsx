'use client';

import React, { useEffect, useState, memo } from 'react';

import { AlertCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  titleEs?: string | null;
  url: string;
  date: string;
  category: string;
  urgent: boolean;
  excerpt: string;
}

interface OptimizedNewsTickerProps {
  category?: string;
  locale?: 'en' | 'es';
  limit?: number;
}

// Memoized news item component
const NewsTickerItem = memo(({ item, locale }: { item: NewsItem; locale: 'en' | 'es' }) => {
  const displayTitle = locale === 'es' && item.titleEs ? item.titleEs : item.title;
  
  return (
    <Link href={item.url} target={item.url.startsWith('http') ? '_blank' : undefined}>
      <div
className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all hover:bg-white/10 ${
          item.urgent ? 'bg-red-900/20 border-red-600/50' : 'bg-gray-900/50'
        } border`}
      >
        {item.urgent && <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />}
        <span className="text-sm font-medium">{displayTitle}</span>
        <TrendingUp className="h-4 w-4 text-gray-400 ml-auto" />
      </div>
    </Link>
  );
});

NewsTickerItem.displayName = 'NewsTickerItem';

export const OptimizedNewsTicker = memo(({ 
  category = 'immigration', 
  locale = 'en',
  limit = 5 
}: OptimizedNewsTickerProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use cached data if available in sessionStorage (only on client)
        const cacheKey = `news-ticker-${category}-${locale}-${limit}`;
        
        if (typeof window !== 'undefined' && window.sessionStorage) {
          const cached = sessionStorage.getItem(cacheKey);
          const cacheTime = sessionStorage.getItem(`${cacheKey}-time`);
          
          if (cached && cacheTime) {
            const cacheAge = Date.now() - parseInt(cacheTime);
            if (cacheAge < 5 * 60 * 1000) { // 5 minutes cache
              if (isMounted) {
                setNews(JSON.parse(cached));
                setLoading(false);
              }
              return;
            }
          }
        }

        const response = await fetch(
          `/api/news/ticker?category=${category}&locale=${locale}&limit=${limit}`,
          {
            signal: controller.signal,
            headers: {
              'Cache-Control': 'public, max-age=300',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        
        if (isMounted) {
          setNews(data.posts || []);
          // Cache the data
          sessionStorage.setItem(cacheKey, JSON.stringify(data.posts || []));
          sessionStorage.setItem(`${cacheKey}-time`, Date.now().toString());
        }
      } catch (err) {
        if (isMounted && err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
          // Use fallback news
          setNews([
            {
              id: 'fallback-1',
              title: locale === 'es' 
                ? 'Actualizaciones Legales - Llame 1-844-YO-PELEO'
                : 'Legal Updates - Call 1-844-YO-PELEO',
              titleEs: 'Actualizaciones Legales - Llame 1-844-YO-PELEO',
              url: '/contact',
              date: new Date().toISOString(),
              category: 'general',
              urgent: true,
              excerpt: 'Get the latest updates',
            },
          ]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [category, locale, limit]);

  // Auto-rotate news items
  useEffect(() => {
    if (news.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [news.length]);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 animate-pulse">
        <div className="h-6 bg-gray-800 rounded w-3/4"></div>
      </div>
    );
  }

  if (error || news.length === 0) {
    return null; // Fail silently
  }

  return (
    <div className="relative overflow-hidden">
      <>
        {news[currentIndex] && (
          <NewsTickerItem 
            key={news[currentIndex].id} 
            item={news[currentIndex]} 
            locale={locale} 
          />
        )}
      </>
      
      {/* Progress dots */}
      {news.length > 1 && (
        <div className="flex justify-center gap-1 mt-2">
          {news.map((_, index) => (
            <button
              key={index}

                onClick={() => setCurrentIndex(index)}

                className={`h-1.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-6 bg-primary' 
                  : 'w-1.5 bg-gray-600 hover:bg-gray-500'
              }`} aria-label={`Go to news item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

OptimizedNewsTicker.displayName = 'OptimizedNewsTicker';
