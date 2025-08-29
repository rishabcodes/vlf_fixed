'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface DbImageProps {
  // Image identification (use one of these)
  id?: string; // Direct database ID
  filename?: string; // Filename with category
  category?: string; // Category (required with filename)
  entityType?: string; // Entity type for lookup
  entityId?: string; // Entity ID for lookup
  
  // Display properties
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  
  // Performance options
  useThumbnail?: boolean; // Use thumbnail for initial load
  lazy?: boolean; // Lazy load image
}

export default function DbImage({
  id,
  filename,
  category,
  entityType,
  entityId,
  alt,
  width = 500,
  height = 500,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  placeholder,
  blurDataURL,
  onLoad,
  onError,
  style,
  useThumbnail = false,
  lazy = !priority, // Automatically set lazy to false if priority is true
}: DbImageProps) {
  // If we have a direct ID, we can set the URL immediately without loading
  const initialUrl = id ? `/api/images/${id}${useThumbnail ? '?thumbnail=true' : ''}` : '';
  const [imageUrl, setImageUrl] = useState<string>(initialUrl);
  const [imageData, setImageData] = useState<{
    width?: number;
    height?: number;
    alt?: string;
  }>({});
  const [loading, setLoading] = useState(!id); // Only show loading if we need to fetch
  const [error, setError] = useState(false);

  useEffect(() => {
    // Skip if we already have an ID (URL is set on initialization)
    if (id) return;

    let mounted = true;
    const abortController = new AbortController();

    const fetchImage = async () => {
      try {
        if (!mounted) return;
        setLoading(true);
        setError(false);

        // If we have filename and category, use the batch endpoint
        if (filename && category) {
          const response = await fetch('/api/images/batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, category }),
            signal: abortController.signal,
          });

          if (!response.ok) throw new Error('Image not found');

          const data = await response.json();
          if (!mounted) return; // Check if still mounted before updating state
          
          if (data.images && data.images.length > 0) {
            const image = data.images[0];
            setImageUrl(useThumbnail ? image.thumbnailUrl : image.url);
            setImageData({
              width: image.width || width,
              height: image.height || height,
              alt: image.alt || alt,
            });
          }
          setLoading(false);
          return;
        }

        // If we have entity information, fetch by entity
        if (entityType && entityId) {
          const response = await fetch(`/api/images/batch?entityType=${entityType}&entityId=${entityId}`, {
            signal: abortController.signal,
          });
          
          if (!response.ok) throw new Error('Images not found');

          const data = await response.json();
          if (!mounted) return; // Check if still mounted before updating state
          
          if (data.images && data.images.length > 0) {
            const image = data.images[0]; // Take the first image
            setImageUrl(useThumbnail ? image.thumbnailUrl : image.url);
            setImageData({
              width: image.width || width,
              height: image.height || height,
              alt: image.alt || alt,
            });
          }
          setLoading(false);
          return;
        }

        throw new Error('No valid image identifier provided');
      } catch (err: any) {
        // Ignore abort errors
        if (err?.name === 'AbortError') return;
        
        if (mounted) {
          console.error('Error fetching image:', err);
          setError(true);
          setLoading(false);
          if (onError) onError();
        }
      }
    };

    fetchImage();

    // Cleanup function
    return () => {
      mounted = false;
      abortController.abort();
    };
  }, [id, filename, category, entityType, entityId, useThumbnail, width, height, alt, onError]);

  // Fallback image
  const fallbackSrc = '/images/logo.png';

  if (loading) {
    return (
      <div 
        className={`animate-pulse bg-gray-200 ${className}`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          ...style,
        }}
      />
    );
  }

  if (error || !imageUrl) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          ...style,
        }}
      >
        <span>Image not found</span>
      </div>
    );
  }

  // Use Next.js Image with our API URL
  return (
    <Image
      src={imageUrl}
      alt={imageData.alt || alt}
      width={fill ? undefined : (imageData.width || width)}
      height={fill ? undefined : (imageData.height || height)}
      className={className}
      priority={priority}
      fill={fill}
      sizes={sizes}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onLoad={onLoad}
      onError={() => {
        setError(true);
        if (onError) onError();
      }}
      style={style}
      loading={priority ? undefined : (lazy ? 'lazy' : undefined)}
    />
  );
}

// Hook for fetching multiple images
export function useDbImages(
  category?: string,
  entityType?: string,
  entityId?: string
) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();

    const fetchImages = async () => {
      try {
        if (!mounted) return;
        setLoading(true);
        setError(false);

        const response = await fetch('/api/images/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, entityType, entityId }),
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error('Failed to fetch images');

        const data = await response.json();
        if (mounted) {
          setImages(data.images || []);
        }
      } catch (err: any) {
        // Ignore abort errors
        if (err?.name === 'AbortError') return;
        
        if (mounted) {
          console.error('Error fetching images:', err);
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchImages();

    // Cleanup function
    return () => {
      mounted = false;
      abortController.abort();
    };
  }, [category, entityType, entityId]);

  return { images, loading, error };
}