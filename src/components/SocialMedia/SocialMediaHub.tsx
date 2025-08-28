'use client';

import React, { useState, useEffect } from 'react';

import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Music2,
  X,
  ExternalLink,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { stripHtml } from '@/lib/utils/stripHtml';
import Image from 'next/image';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  username: string;
  embedUrl?: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <Facebook className="w-5 h-5" />,
    url: 'https://www.facebook.com/vasquezlawnc',
    color: '#1877F2',
    username: '@vasquezlawnc'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className="w-5 h-5" />,
    url: 'https://www.instagram.com/vasquezlawnc',
    color: '#E4405F',
    username: '@vasquezlawnc'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: <Twitter className="w-5 h-5" />,
    url: 'https://twitter.com/vasquezlawnc',
    color: '#000000',
    username: '@vasquezlawnc'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: <Youtube className="w-5 h-5" />,
    url: 'https://www.youtube.com/@vasquezlawfirm',
    color: '#FF0000',
    username: '@vasquezlawfirm'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <Music2 className="w-5 h-5" />,
    url: 'https://www.tiktok.com/@vasquezlawfirm',
    color: '#000000',
    username: '@vasquezlawfirm'
  }
];

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  url: string;
}

export function SocialMediaHub({ className }: { className?: string }) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock posts for demonstration
  useEffect(() => {
    setPosts([
      {
        id: '1',
        platform: 'instagram',
        content: 'Know your rights! Our team is here to help with immigration matters. 🇺🇸 #ImmigrationLaw #YoPeleo',
        mediaUrl: 'https://picsum.photos/400/400?random=1',
        mediaType: 'image',
        likes: 245,
        comments: 18,
        shares: 32,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        url: 'https://www.instagram.com/p/example1'
      },
      {
        id: '2',
        platform: 'youtube',
        content: 'Understanding DACA: Everything You Need to Know in 2024',
        mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        mediaType: 'video',
        likes: 1203,
        comments: 89,
        shares: 156,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: '3',
        platform: 'facebook',
        content: 'Free consultation available! Contact us today to discuss your case. 📞 1-844-YO-PELEO',
        likes: 432,
        comments: 27,
        shares: 64,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        url: 'https://www.facebook.com/vasquezlawnc/posts/example'
      }
    ]);
  }, []);

  return (
    <div className={cn('w-full', className)}>
      {/* Social Media Follow Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
            <div className="flex items-center gap-2">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.id}

                href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
className="relative group"

                >
                  <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    {platform.icon}
                  </div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {platform.username}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Feed */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const platform = socialPlatforms.find(p => p.id === post.platform);
              
              return (
                <div
                  key={post.id}

                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Post Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="p-1.5 rounded-full"

                        >
                          {platform?.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {platform?.name}
                        </span>
                      </div>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Post Media */}
                  {post.mediaUrl && (
                    <div className="relative aspect-square bg-gray-100">
                      {post.mediaType === 'image' ? (
                        <Image
                          src={post.mediaUrl alt="Social media post"
                          fill
                          className="object-cover"
                        />
                      ) : post.mediaType === 'video' && post.platform === 'youtube' ? (
                        <iframe
                          src={post.mediaUrl className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div
      className="absolute inset-0 flex items-center justify-center">
                          <Play      className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-4">
                    <p className="text-gray-700 mb-3 line-clamp-3">{stripHtml(post.content)}</p>
                    
                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        {post.shares}
                      </span>
                    </div>
                    
                    {/* Timestamp */}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Embedded Feeds Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Facebook Page Plugin */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Facebook className="w-5 h-5 text-[#1877F2]" />
                Facebook
              </h3>
              <div className="bg-white rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Facebook Page Plugin would load here
                  <br />
                  <a 
                    href="https://www.facebook.com/vasquezlawnc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline mt-2 inline-block"
                  >
                    Visit our Facebook page →
                  </a>
                </p>
              </div>
            </div>

            {/* Twitter Timeline */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Twitter className="w-5 h-5" />
                X (Twitter)
              </h3>
              <div className="bg-white rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Twitter Timeline would load here
                  <br />
                  <a 
                    href="https://twitter.com/vasquezlawnc" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline mt-2 inline-block"
                  >
                    Follow us on X →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
          <p className="mb-6">
            Follow us on social media for legal updates, tips, and community news
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.id}

                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
}
}
