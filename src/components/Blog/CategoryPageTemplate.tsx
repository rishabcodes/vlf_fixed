'use client';

import React, { useState, useEffect } from 'react';
import { securityLogger } from '@/lib/safe-logger';
import Link from 'next/link';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import {
  getCategoryById,
  getRelatedCategories,
  getCategoryUrl,
  BlogCategoryId,
} from '@/lib/blog/categories';
import { BlogCategoryStructuredData } from '@/components/Blog/BlogStructuredData';
import { stripHtml } from '@/lib/utils/stripHtml';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  practiceArea: string;
  language: 'en' | 'es';
  publishedAt: Date;
  readTime: number;
  author: {
    name: string;
    image?: string;
  };
  tags: string[];
  seoScore: number;
}

interface CategoryPageTemplateProps {
  categoryId: BlogCategoryId;
  initialLanguage?: 'en' | 'es';
}

export default function CategoryPageTemplate({
  categoryId,
  initialLanguage = 'en',
}: CategoryPageTemplateProps) {
  const [language, setLanguage] = useState<'en' | 'es'>(initialLanguage);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const category = getCategoryById(categoryId);
  const relatedCategories = getRelatedCategories(categoryId);

  const content = {
    en: {
      search: 'Search in this category...',
      readMore: 'Read Article',
      minRead: 'min read',
      by: 'By',
      published: 'Published',
      loadMore: 'Load More Articles',
      noResults: 'No articles found in this category.',
      relatedCategories: 'Explore Other Topics',
      newsletter: 'Legal Updates Newsletter',
      newsletterDesc: 'Get the latest legal insights delivered to your inbox',
      email: 'Enter your email',
      subscribe: 'Subscribe',
      viewAllPosts: 'View All Blog Posts',
      recentPosts: 'Recent Articles in',
      popularTags: 'Popular Topics',
      needHelp: 'Need Legal Assistance?',
      contactUs: 'Contact Us Today',
      freeConsultation: 'Free Consultation',
    },
    es: {
      search: 'Buscar en esta categoría...',
      readMore: 'Leer Artículo',
      minRead: 'min de lectura',
      by: 'Por',
      published: 'Publicado',
      loadMore: 'Cargar Más Artículos',
      noResults: 'No se encontraron artículos en esta categoría.',
      relatedCategories: 'Explorar Otros Temas',
      newsletter: 'Boletín de Actualizaciones Legales',
      newsletterDesc: 'Reciba las últimas perspectivas legales en su correo',
      email: 'Ingrese su correo',
      subscribe: 'Suscribirse',
      viewAllPosts: 'Ver Todos los Artículos',
      recentPosts: 'Artículos Recientes en',
      popularTags: 'Temas Populares',
      needHelp: '¿Necesita Asistencia Legal?',
      contactUs: 'Contáctenos Hoy',
      freeConsultation: 'Consulta Gratis',
    },
  };

  const t = content[language];

  const fetchPosts = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        language,
        page: page.toString(),
        limit: '12',
        category: categoryId,
      });

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const response = await fetch(`/api/blog/import?${params}`);
      const data = await response.json();

      if (response.ok) {
        const newPosts = data.posts.map((post: Record<string, unknown>) => ({
          ...post,
          publishedAt: new Date(post.publishedAt as string),
        }));

        setPosts(prevPosts => (page === 1 ? newPosts : [...prevPosts, ...newPosts]));
        setHasMore(data.hasMore);
      } else {
        securityLogger.error('Error fetching posts:', data.error);
        setPosts([]);
        setHasMore(false);
      }
    } catch (error) {
      securityLogger.error('Error fetching posts:', error);
      setPosts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [language, page, searchQuery, categoryId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Reset page when search changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <BlogCategoryStructuredData categoryId={categoryId} language={language} />
      <div className="min-h-screen bg-white">
        {/* Top Bar */}
        <div className="bg-[#6B1F2E] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm">
              <span>📞 1-844-YO-PELEO (967-3536)</span>
              <span className="hidden sm:inline">📧 leads@vasquezlawfirm.com</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('en')}

                className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}

                className={`px-2 py-1 text-xs rounded ${language === 'es' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sticky top-0 z-40 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center">
                <div>
                  <h1 className="text-2xl font-bold text-[#6B1F2E]">Vasquez Law Firm, PLLC</h1>
                  <p className="text-xs text-[#C9974D] font-semibold">YO PELEO POR TI™</p>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/practice-areas"
                  className="text-gray-700 hover:text-[#C9974D] transition-colors font-medium"
                >
                  {language === 'es' ? 'Áreas de Práctica' : 'Practice Areas'}
                </Link>
                <Link
                  href={language === 'es' ? '/es/blog' : '/blog'} className="text-gray-700 hover:text-[#C9974D] transition-colors font-medium"
                >
                  Blog
                </Link>
                <Link
                href={language === 'es' ? '/es/contacto' : '/contact'}

                className="text-gray-700 hover:text-[#C9974D] transition-colors font-medium"
                >
                  {language === 'es' ? 'Contacto' : 'Contact'}
                </Link>
                <button className="px-6 py-2 bg-[#6B1F2E] text-white rounded-md hover:bg-[#8B2635] transition-colors font-medium">
                  {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className={`py-16 ${category.lightColor}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div
                  className={`w-24 h-24 ${category.lightColor} rounded-full flex items-center justify-center`}
                >
                  <span className="text-5xl">{category.icon}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {category.name[language]} Blog
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                {category.description[language]}
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
                  />
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href={language === 'es' ? '/es' : '/'}

                className="text-gray-600 hover:text-[#C9974D]"
              >
                {language === 'es' ? 'Inicio' : 'Home'}
              </Link>
              <span className="text-gray-400">/</span>
              <Link href={language === 'es' ? '/es/blog' : '/blog'}
      className="text-gray-600 hover:text-[#C9974D]"
              >
                Blog
              </Link>
              <span className="text-gray-400">/</span>
              <span className={category.textColor}>{category.name[language]}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  {t.recentPosts} {category.name[language]}
                </h2>

                {loading && page === 1 ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9974D]"></div>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-6">{t.noResults}</p>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-[#C9974D] hover:underline"
                    >
                      {t.viewAllPosts}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-8">
                      {posts.map((post, index) => (
                        <article
                          key={post.id}

                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                          <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <span
                className={`px-3 py-1 ${category.lightColor} ${category.textColor} rounded-full text-sm font-medium flex items-center gap-1`}
                              >
                                <span>{category.icon}</span>
                                {category.name[language]}
                              </span>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {post.readTime} {t.minRead}
                              </div>
                              {post.seoScore >= 90 && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                  SEO {post.seoScore}%
                                </span>
                              )}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              <Link
                                href={`${language === 'es' ? '/es' : ''}/blog/${post.slug}`}

                className="hover:text-[#C9974D] transition-colors"
                              >
                                {post.title}
                              </Link>
                            </h3>

                            <p className="text-gray-600 mb-4">{stripHtml(post.excerpt)}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                  <span className="text-sm">👤</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {post.author.name}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Calendar className="w-3 h-3" />
                                    {format(post.publishedAt, 'PPP', {
                                      locale: language === 'es' ? es : undefined,
                                    })}
                                  </div>
                                </div>
                              </div>
                              <Link
                                href={`${language === 'es' ? '/es' : ''}/blog/${post.slug}`}

                className="inline-flex items-center gap-2 text-[#C9974D] font-medium hover:underline"
                              >
                                {t.readMore}
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>

                            {post.tags.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {post.tags.slice(0, 4).map(tag => (
                                  <span
                                    key={tag}

                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                  >
                                    <Tag
                className="w-3 h-3" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Load More */}
                    {hasMore && !loading && (
                      <div className="text-center mt-12">
                        <button
                          onClick={() => setPage(page + 1)}

                className="px-8 py-3 bg-[#C9974D] text-white rounded-md font-medium hover:bg-[#D4A574] transition-colors"
                        >
                          {t.loadMore}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Need Help CTA */}
                <div className={`${category.color} text-white rounded-lg p-6`}>
                  <h3 className="text-xl font-bold mb-3">{t.needHelp}</h3>
                  <p className="mb-4 text-white/90">
                    {language === 'es'
                      ? 'Nuestros abogados experimentados están listos para ayudarle con su caso.'
                      : 'Our experienced attorneys are ready to help with your case.'}
                  </p>
                  <Link
                    href={language === 'es' ? '/es/contacto' : '/contact'}

                className="block w-full text-center px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    {t.freeConsultation}
                  </Link>
                </div>

                {/* Related Categories */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.relatedCategories}</h3>
                  <div className="space-y-3">
                    {relatedCategories.map(relatedId => {
                      const relatedCategory = getCategoryById(relatedId);
                      if (!relatedCategory) return null;

                      return (
                        <Link
                          key={relatedId}

                href={getCategoryUrl(relatedId, language)} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div
      className="flex items-center gap-3">
                            <span className="text-2xl">{relatedCategory.icon}</span>
                            <span className="font-medium text-gray-700 group-hover:text-[#C9974D]">
                              {relatedCategory.name[language]}
                            </span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C9974D]" />
                        </Link>
                      );
                    })}
                    <Link href={language === 'es' ? '/es/blog' : '/blog'}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group border-t pt-6"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📚</span>
                        <span className="font-medium text-gray-700 group-hover:text-[#C9974D]">
                          {t.viewAllPosts}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C9974D]" />
                    </Link>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] rounded-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">{t.newsletter}</h3>
                  <p className="text-sm mb-4">{t.newsletterDesc}</p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder={t.email}
      className="w-full px-4 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-white text-[#6B1F2E] rounded-md font-medium hover:bg-gray-100 transition-colors"
                    >
                      {t.subscribe}
                    </button>
                  </form>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.popularTags}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.keywords.map(keyword => (
                      <button
                        key={keyword}

                onClick={() => setSearchQuery(keyword)}

                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
