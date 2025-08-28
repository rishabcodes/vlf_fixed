'use client';

import React, { useEffect, useState, memo, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
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

// Static fallback news for instant loading
const STATIC_NEWS: NewsItem[] = [
  {
    id: 'static-1',
    title: 'Immigration Policy Updates',
    titleEs: 'Actualizaciones de Política Migratoria',
    url: '/blog/immigration-updates',
    date: new Date().toISOString(),
    category: 'immigration',
    urgent: false,
    excerpt: 'Latest immigration law changes'
  },
  {
    id: 'static-2',
    title: 'Know Your Rights',
    titleEs: 'Conozca Sus Derechos',
    url: '/resources/know-your-rights',
    date: new Date().toISOString(),
    category: 'legal',
    urgent: false,
    excerpt: 'Important legal information'
  }
];

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
        <span className="text-sm font-medium line-clamp-1">{displayTitle}</span>
        <TrendingUp className="h-4 w-4 text-gray-400 ml-auto flex-shrink-0" />
      </div>
    </Link>
  );
});

NewsTickerItem.displayName = 'NewsTickerItem';

export const SuperOptimizedNewsTicker = memo(({ 
  category = 'immigration', 
  locale = 'en',
  limit = 3 // Reduced default limit
}: OptimizedNewsTickerProps) => {
  const [news, setNews] = useState<NewsItem[]>(STATIC_NEWS.slice(0, limit));
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchNews = useCallback(async () => {
    // Only fetch if we haven't loaded yet
    if (hasLoaded) return;
    
    // Check localStorage cache first
    const cacheKey = `news_${category}_${locale}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        // Use cache if less than 1 hour old
        if (Date.now() - timestamp < 3600000) {
          setNews(data.slice(0, limit));
          setHasLoaded(true);
          return;
        }
      } catch (e) {
        // Invalid cache, continue to fetch
      }
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/news/ticker?category=${category}&limit=${limit}&locale=${locale}`,
        {
          next: { revalidate: 3600 }, // Cache for 1 hour
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.news && data.news.length > 0) {
          setNews(data.news);
          // Cache the results
          localStorage.setItem(cacheKey, JSON.stringify({
            data: data.news,
            timestamp: Date.now()
          }));
          setHasLoaded(true);
        }
      }
    } catch (error) {
      logger.error('Failed to fetch news:', error);
      // Keep static news on error
    } finally {
      setLoading(false);
    }
  }, [category, locale, limit, hasLoaded]);

  useEffect(() => {
    // Delay news fetch until after initial page load
    const timer = setTimeout(() => {
      // Only fetch if user has scrolled or interacted
      const handleInteraction = () => {
        fetchNews();
      };
      
      window.addEventListener('scroll', handleInteraction, { once: true });
      window.addEventListener('mousemove', handleInteraction, { once: true });
      
      // Fallback: load after 10 seconds anyway
      const fallbackTimer = setTimeout(handleInteraction, 10000);
      
      return () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('mousemove', handleInteraction);
      };
    }, 2000); // Wait 2 seconds before setting up listeners

    return () => clearTimeout(timer);
  }, [fetchNews]);

  const currentIndex = 0; // Removed auto-rotation for performance

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-red-500 rounded-full p-1.5">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
            </div>
            <span className="font-bold text-sm">
              {locale === 'es' ? 'NOTICIAS' : 'NEWS'}
            </span>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-2">
              {news.slice(0, 3).map((item) => (
                <div key={item.id} className="flex-1 min-w-0">
                  <NewsTickerItem item={item} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SuperOptimizedNewsTicker.displayName = 'SuperOptimizedNewsTicker';