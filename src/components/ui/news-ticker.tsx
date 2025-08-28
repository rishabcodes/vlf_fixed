'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { componentLogger } from '@/lib/safe-logger';

interface NewsItem {
  id: string;
  title: string;
  titleEs?: string;
  url: string;
  date: string;
  category: 'immigration' | 'workers-comp' | 'personal-injury' | 'criminal' | 'family';
  urgent?: boolean;
}

interface NewsTickerProps {
  className?: string;
  locale?: 'en' | 'es';
}

// Cache news data in memory to avoid repeated API calls
const newsCache = new Map<string, { data: NewsItem[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function NewsTicker({ className, locale = 'en' }: NewsTickerProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug: Log component mount only in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      componentLogger.mount('NewsTicker', { locale });
      return () => componentLogger.unmount('NewsTicker');
    }
  }, [locale]);

  useEffect(() => {
    // Fetch recent news items with caching
    const fetchNews = async () => {
      const cacheKey = `news-${locale}`;
      const cached = newsCache.get(cacheKey);
      
      // Use cached data if it's still fresh
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setNewsItems(cached.data);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        if (process.env.NODE_ENV === 'development') {
          componentLogger.debug('Fetching news', { locale });
        }
        const response = await fetch(
          `/api/news/ticker?category=immigration&limit=10&locale=${locale}`
        );
        if (process.env.NODE_ENV === 'development') {
          componentLogger.debug('Response received', { status: response.status });
        }
        if (response.ok) {
          const data = await response.json();
          if (process.env.NODE_ENV === 'development') {
            componentLogger.debug('Received data', { itemCount: data.posts?.length || 0 });
          }
          const posts = data.posts || [];
          setNewsItems(posts);
          // Cache the data
          newsCache.set(cacheKey, { data: posts, timestamp: Date.now() });
        } else {
          const errorText = await response.text();
          componentLogger.error('Failed to fetch news', {
            status: response.status,
            error: errorText
          });
          setError(`Failed to fetch news: ${response.status}`);
        }
      } catch (error) {
        componentLogger.error('Error fetching news', error instanceof Error ? error : { error });
        setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        // Try to use stale cache if available
        if (cached) {
          setNewsItems(cached.data);
        }
      } finally {
        setIsLoading(false);
          }
};

    fetchNews();
    const interval = setInterval(fetchNews, CACHE_DURATION); // Refresh at cache duration

    return () => clearInterval(interval);
  }, [locale]);

  useEffect(() => {
    if (!isPaused && newsItems.length > 0) {
      const ticker = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % newsItems.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(ticker);
    }
  }, [isPaused, newsItems.length]);

  // Debug: Log render state only in development
  if (process.env.NODE_ENV === 'development') {
    componentLogger.debug('Render state', { isLoading, error, itemCount: newsItems.length });
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-0.5 px-4 h-[20px] flex items-center">
        <div className="max-w-7xl mx-auto text-center text-[10px] w-full">
          <span className="text-[#C9974D]">Loading news...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-0.5 px-4 h-[20px] flex items-center">
        <div className="max-w-7xl mx-auto text-center text-[10px] w-full">
          <span className="text-red-300">Error: {error}</span>
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      componentLogger.debug('No news items to display');
    }
    // Return a placeholder to verify the component is mounting
    return (
      <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-0.5 px-4 h-[20px] flex items-center">
        <div className="max-w-7xl mx-auto text-center text-[10px] w-full">
          <span className="text-[#C9974D]">No news available</span>
        </div>
      </div>
    );
  }

  const currentItem = newsItems[currentIndex];
  if (!currentItem) {
    return null;
  }
  const displayTitle =
    locale === 'es' && currentItem.titleEs ? currentItem.titleEs : currentItem.title;

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-0.5 px-4 overflow-hidden h-[20px] flex items-center',
        'shadow-lg', // Add shadow for visibility
        className
      )}
      style={{
        // Ensure visibility with inline styles as backup
        backgroundColor: '#6B1F2E',
        minHeight: '20px',
        position: 'relative',
        zIndex: 100,
      }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2 shrink-0">
            {currentItem?.urgent && <AlertCircle className="w-3 h-3 text-[#C9974D] animate-pulse" />}
            <span className="text-[#C9974D] font-bold text-[10px] uppercase tracking-wider flex items-center">
              YO PELEO™ NOTICIAS
              <span className="mx-2 text-white/50">|</span>
              {locale === 'es' ? 'Últimas Actualizaciones' : 'Latest Updates'}
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <Link
              href={currentItem?.url || '#'}

                className="group flex items-center space-x-2 hover:text-[#C9974D] transition-colors"
            >
              <span
                className="truncate text-[10px] md:text-xs">{displayTitle}</span>
              <ChevronRight className="w-3 h-3 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 ml-4">
          {newsItems.map((_, index) => (
            <button
              key={index}

                onClick={() => setCurrentIndex(index)}

                className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex ? 'bg-[#C9974D] w-6' : 'bg-white/30 hover:bg-white/50'
              )}

                aria-label={`Go to news item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Animation is handled by Tailwind, removed manual style injection
