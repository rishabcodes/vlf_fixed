'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Calendar, User, ArrowRight, Clock, ChevronLeft } from 'lucide-react';
import { getCategoryById } from '@/lib/blog/categories';
import { stripHtml } from '@/lib/utils/stripHtml';

interface BlogPost {
  id: string;
  title: string;
  titleEs?: string;
  slug: string;
  excerpt: string;
  excerptEs?: string;
  featuredImage?: string;
  category: string;
  publishedAt: string;
  readTime?: number;
  author?: string;
}

interface CategoryPageClientProps {
  category: string;
  language?: 'en' | 'es';
}

export default function CategoryPageClient({ category, language = 'en' }: CategoryPageClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 12;

  const categoryData = getCategoryById(category);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/blog?category=${category}&language=${language}&page=${page}&limit=${postsPerPage}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.posts || []);
      setTotalPages(Math.ceil((data.total || 0) / postsPerPage));
    } catch (error) {
      logger.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [category, language, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
          <Link href="/blog" className="text-primary hover:text-primary-light">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Back to Blog Link */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{language === 'es' ? 'Volver al Blog' : 'Back to Blog'}</span>
          </Link>

          {/* Category Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 text-4xl mb-6 bg-gradient-to-br from-primary to-primary-dark rounded-full">
              {categoryData.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryData.name[language]}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {categoryData.description[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 group"
                >
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={language === 'es' && post.titleEs ? post.titleEs : post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {language === 'es' && post.titleEs ? post.titleEs : post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {stripHtml(language === 'es' && post.excerptEs ? post.excerptEs : post.excerpt)}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} min
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary-light transition-colors group"
                    >
                      <span>{language === 'es' ? 'Leer más' : 'Read more'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  {language === 'es' ? 'Anterior' : 'Previous'}
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        pageNum === page
                          ? 'bg-primary text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  {language === 'es' ? 'Siguiente' : 'Next'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">
              {language === 'es' 
                ? 'No se encontraron artículos en esta categoría.' 
                : 'No posts found in this category.'}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'es' ? 'Volver al Blog' : 'Back to Blog'}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
