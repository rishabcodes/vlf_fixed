'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { componentLogger } from '@/lib/safe-logger';
import { marked } from 'marked';

interface BlogPost {
  id: string;
  title: string;
  titleEs?: string | null;
  slug: string;
  content: string;
  contentEs?: string | null;
  excerpt?: string | null;
  excerptEs?: string | null;
  author?: string | null;
  featuredImage?: string | null;
  images: string[];
  publishedAt?: Date | null;
  category: string;
  practiceArea?: string | null;
  tags: string[];
  keywords: string[];
  readTime: number;
}

interface BlogPostTemplateProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  language?: 'en' | 'es';
}

export const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  post,
  relatedPosts,
  language = 'en',
}) => {
  const isSpanish = language === 'es';
  const dateLocale = isSpanish ? es : undefined;

  const postTitle = isSpanish && post.titleEs ? post.titleEs : post.title;
  const postContent = isSpanish && post.contentEs ? post.contentEs : post.content;
  const postExcerpt = isSpanish && post.excerptEs ? post.excerptEs : post.excerpt;
  
  // Convert markdown to HTML
  const htmlContent = React.useMemo(() => {
    // Configure marked for better security and formatting
    marked.setOptions({
      breaks: true, // Convert line breaks to <br>
      gfm: true, // GitHub Flavored Markdown
    });
    return marked(postContent);
  }, [postContent]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          text: postExcerpt || postTitle,
          url: window.location.href,
        });
      } catch (error) {
        componentLogger.debug('Error sharing', error instanceof Error ? error : { error });
      }
    }
  };

  const readingTime = post.readTime || Math.ceil(postContent.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-secondary to-secondary-700 text-white">
        {post.featuredImage && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={post.featuredImage}

                alt={postTitle}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href={isSpanish ? '/es/blog' : '/blog'}

                className="inline-flex items-center gap-2 text-primary hover:text-primary-300 transition-colors mb-8"
          >
            <ArrowLeft
                className="w-4 h-4" />
            {isSpanish ? 'Volver al Blog' : 'Back to Blog'}
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{postTitle}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={new Date(post.publishedAt).toISOString()}>
                  {format(new Date(post.publishedAt), isSpanish ? "d 'de' MMMM, yyyy" : 'MMMM d, yyyy', {
                    locale: dateLocale,
                  })}
                </time>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {readingTime} {isSpanish ? 'min de lectura' : 'min read'}
              </span>
            </div>
          </div>

          {/* Category and Practice Area */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.category && (
              <Link
                href={`/${isSpanish ? 'es/' : ''}blog/category/${post.category}`}

                className="bg-primary/20 hover:bg-primary/30 px-3 py-1 rounded-full text-xs font-medium transition-colors"
              >
                {post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' ')}
              </Link>
            )}
            {post.practiceArea && (
              <Link
                href={`/${isSpanish ? 'es/' : ''}practice-areas/${post.practiceArea}`}

                className="bg-primary/20 hover:bg-primary/30 px-3 py-1 rounded-full text-xs font-medium transition-colors"
              >
                {post.practiceArea.charAt(0).toUpperCase() + post.practiceArea.slice(1).replace('-', ' ')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {post.featuredImage && (
              <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.featuredImage}

                alt={postTitle}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Additional Images */}
            {post.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                {post.images.map((image, index) => (
                  <div key={index}

                className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image}

                alt={`${postTitle} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                  {isSpanish ? 'Etiquetas' : 'Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}

                href={`/${isSpanish ? 'es/' : ''}blog/tag/${tag}`}

                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Button */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                {isSpanish ? 'Compartir' : 'Share'}
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Call to Action */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-secondary mb-4">
                {isSpanish ? '¿Necesita Ayuda Legal?' : 'Need Legal Help?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isSpanish
                  ? 'Nuestros abogados experimentados están listos para ayudarle. Programe una consulta gratuita hoy.'
                  : 'Our experienced attorneys are ready to help. Schedule a free consultation today.'}
              </p>
              <Link
                href={isSpanish ? '/es/contacto' : '/contact'}

                className="block w-full text-center bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {isSpanish ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-secondary mb-6">
                  {isSpanish ? 'Artículos Relacionados' : 'Related Articles'}
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => {
                    const relatedTitle = isSpanish && relatedPost.titleEs ? relatedPost.titleEs : relatedPost.title;
                    return (
                      <Link
                        key={relatedPost.id}

                href={`/${isSpanish ? 'es/' : ''}blog/${relatedPost.slug}`}

                className="block group"
                      >
                        <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors mb-2">
                          {relatedTitle}
                        </h4>
                        {relatedPost.publishedAt && (
                          <p className="text-sm text-gray-500">
                            {format(
                              new Date(relatedPost.publishedAt),
                              isSpanish ? "d 'de' MMMM, yyyy" : 'MMMM d, yyyy',
                              { locale: dateLocale }
                            )}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
