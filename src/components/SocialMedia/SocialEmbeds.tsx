'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

interface FacebookPagePluginProps {
  pageUrl: string;
  width?: number;
  height?: number;
  showFacepile?: boolean;
  showPosts?: boolean;
  hideCover?: boolean;
  smallHeader?: boolean;
}

export function FacebookPagePlugin({
  pageUrl = 'https://www.facebook.com/vasquezlawnc',
  width = 340,
  height = 500,
  showFacepile = true,
  showPosts = true,
  hideCover = false,
  smallHeader = false
}: FacebookPagePluginProps) {
  return (
    <>
      <div id="fb-root"></div>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0"
        strategy="lazyOnload"
      />
      <div 
        className="fb-page" 
        data-href={pageUrl}
        data-tabs={showPosts ? "timeline" : ""}
        data-width={width}
        data-height={height}
        data-small-header={smallHeader}
        data-adapt-container-width="true"
        data-hide-cover={hideCover}
        data-show-facepile={showFacepile}
      >
        <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
          <a href={pageUrl}>Vasquez Law Firm on Facebook</a>
        </blockquote>
      </div>
    </>
  );
}

interface TwitterTimelineProps {
  username: string;
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
}

export function TwitterTimeline({
  username = 'vasquezlawnc',
  width = 340,
  height = 500,
  theme = 'light'
}: TwitterTimelineProps) {
  useEffect(() => {
    // Load Twitter widgets script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <a 
      className="twitter-timeline" 
      data-width={width} data-height={height} data-theme={theme} href={`https://twitter.com/${username}`}
    >
      Tweets by {username}
    </a>
  );
}

interface InstagramEmbedProps {
  postUrl: string;
  width?: number;
  captioned?: boolean;
}

export function InstagramEmbed({
  postUrl,
  width = 340,
  captioned = true
}: InstagramEmbedProps) {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Process embeds after script loads
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
          }
};

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
          }
};
  }, [postUrl]);

  return (
    <blockquote 
      className="instagram-media" 
      data-instgrm-captioned={captioned}
      data-instgrm-permalink={postUrl}
      data-instgrm-version="14"
      style={{ 
        background: '#FFF',
        border: 0,
        borderRadius: '3px',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
        margin: '1px',
        maxWidth: `${width}px`,
        minWidth: '326px',
        padding: 0,
        width: '99.375%'
      }}
    >
      <a href={postUrl} target="_blank" rel="noopener noreferrer">
        View this post on Instagram
      </a>
    </blockquote>
  );
}

interface YouTubeEmbedProps {
  videoId: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  controls?: boolean;
  modestBranding?: boolean;
}

export function YouTubeEmbed({
  videoId,
  width = 560,
  height = 315,
  autoplay = false,
  controls = true,
  modestBranding = true
}: YouTubeEmbedProps) {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    controls: controls ? '1' : '0',
    modestbranding: modestBranding ? '1' : '0',
    rel: '0', // Don't show related videos
    showinfo: '0'
  });

  return (
    <div className="relative" style={{ paddingBottom: `${(height / width) * 100}%` }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

interface TikTokEmbedProps {
  videoUrl: string;
  width?: number;
  height?: number;
}

export function TikTokEmbed({
  videoUrl,
  width = 325,
  height = 575
}: TikTokEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
          }
};
  }, []);

  // Extract video ID from URL
  const videoId = videoUrl.match(/video\/(\d+)/)?.[1] || '';

  return (
    <blockquote 
      className="tiktok-embed" 
      cite={videoUrl}
      data-video-id={videoId} style={{ maxWidth: `${width}px`, minWidth: '325px' }}
    >
      <section>
        <a target="_blank" href={videoUrl} rel="noopener noreferrer">
          View on TikTok
        </a>
      </section>
    </blockquote>
  );
}

interface LinkedInFollowProps {
  companyId: string;
  counter?: 'top' | 'right' | 'none';
}

export function LinkedInFollow({
  companyId = 'vasquez-law-firm',
  counter = 'top'
}: LinkedInFollowProps) {
  useEffect(() => {
    // Load LinkedIn script
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/in.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
          }
};
  }, []);

  return (
    <>
      <script 
        type="IN/FollowCompany" 
        data-id={companyId}
        data-counter={counter}
      />
    </>
  );
}

// Aggregate social feed component
interface SocialFeedProps {
  platforms: Array<'facebook' | 'twitter' | 'instagram' | 'youtube' | 'tiktok'>;
  maxItemsPerPlatform?: number;
}

export function SocialFeed({ 
  platforms = ['facebook', 'twitter', 'instagram', 'youtube'],
  maxItemsPerPlatform = 3 
}: SocialFeedProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {platforms.includes('facebook') && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-[#1877F2] text-white">
            <h3 className="font-semibold">Facebook</h3>
          </div>
          <div className="p-4">
            <FacebookPagePlugin 
              pageUrl="https://www.facebook.com/vasquezlawnc"
              height={400}
              showPosts={true}
              showFacepile={false}
            />
          </div>
        </div>
      )}

      {platforms.includes('twitter') && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-black text-white">
            <h3 className="font-semibold">X (Twitter)</h3>
          </div>
          <div className="p-4">
            <TwitterTimeline 
              username="vasquezlawnc"
              height={400}
            />
          </div>
        </div>
      )}

      {platforms.includes('youtube') && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-[#FF0000] text-white">
            <h3 className="font-semibold">YouTube</h3>
          </div>
          <div className="p-4">
            <YouTubeEmbed 
              videoId="dQw4w9WgXcQ" // Replace with actual video ID
              width={300}
              height={200}
            />
          </div>
        </div>
      )}

      {platforms.includes('instagram') && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white">
            <h3 className="font-semibold">Instagram</h3>
          </div>
          <div className="p-4">
            <p className="text-gray-500 text-center py-8">
              Instagram feed integration
              <br />
              <a 
                href="https://www.instagram.com/vasquezlawnc" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline mt-2 inline-block"
              >
                Follow us on Instagram →
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
