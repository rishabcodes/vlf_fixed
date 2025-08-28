'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface AnnouncementBarProps {
  initiallyOpen?: boolean;
  message?: string;
  linkText?: string;
  linkHref?: string;
  storageKey?: string;
}

export function AnnouncementBar({
  initiallyOpen = true,
  message = "YO PELEO™ NEWS: Latest updates",
  linkText = "Learn more →",
  linkHref = "/news",
  storageKey = "announcement-dismissed"
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage to see if user dismissed the bar
    const isDismissed = localStorage.getItem(storageKey) === 'true';
    setIsVisible(initiallyOpen && !isDismissed);
  }, [initiallyOpen, storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-2 text-xs font-medium">
            <span>{message}</span>
            <Link 
              href={linkHref}
              className="underline hover:no-underline font-semibold"
            >
              {linkText}
            </Link>
          </div>
          <button
            onClick={handleDismiss}
            className="p-0.5 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}