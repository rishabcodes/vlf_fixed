'use client';

import { securityLogger } from '@/lib/safe-logger';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getCategoryById, getAllCategories } from '@/lib/blog/categories';
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

interface BlogPageClientProps {
  language?: 'en' | 'es';
}

export default function BlogPageClient({ language: propLanguage }: BlogPageClientProps = {}) {
  const [language] = useState<'en' | 'es'>(propLanguage || 'en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categorizedPosts, setCategorizedPosts] = useState<Record<string, BlogPost[]>>({});

  const content = {
    en: {
      title: 'Legal Insights & News',
      subtitle:
        'Stay informed with expert legal analysis and updates for North Carolina and Florida',
      search: 'Search articles...',
      readMore: 'Read More',
      minRead: 'min read',
      by: 'By',
      trending: 'Trending Topics',
      recent: 'Recent Articles',
      allCategories: 'All Categories',
      newsletter: 'Subscribe to Our Newsletter',
      newsletterDesc: 'Get the latest legal updates delivered to your inbox',
      email: 'Enter your email',
      subscribe: 'Subscribe',
      loadMore: 'Load More Articles',
      noResults: 'No articles found matching your search.',
      relatedPosts: 'Related Articles',
      shareArticle: 'Share This Article',
      tags: 'Tags',
      published: 'Published',
      viewAll: 'View All',
      filterBy: 'Filter by Practice Area',
      clearFilters: 'Clear Filters',
    },
    es: {
      title: 'Perspectivas Legales y Noticias',
      subtitle:
        'Manténgase informado con análisis legal experto y actualizaciones para Carolina del Norte y Florida',
      search: 'Buscar artículos...',
      readMore: 'Leer Más',
      minRead: 'min de lectura',
      by: 'Por',
      trending: 'Temas Tendencia',
      recent: 'Artículos Recientes',
      allCategories: 'Todas las Categorías',
      newsletter: 'Suscríbase a Nuestro Boletín',
      newsletterDesc: 'Reciba las últimas actualizaciones legales en su correo',
      email: 'Ingrese su correo',
      subscribe: 'Suscribirse',
      loadMore: 'Cargar Más Artículos',
      noResults: 'No se encontraron artículos que coincidan con su búsqueda.',
      relatedPosts: 'Artículos Relacionados',
      shareArticle: 'Compartir Este Artículo',
      tags: 'Etiquetas',
      published: 'Publicado',
      viewAll: 'Ver Todos',
      filterBy: 'Filtrar por Área de Práctica',
      clearFilters: 'Limpiar Filtros',
    },
  };

  const t = content[language];

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, selectedCategory, page, searchQuery]);

  useEffect(() => {
    // Fetch recent posts separately
    fetchRecentPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        language,
        page: page.toString(),
        limit: '12',
      });

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();

      if (response.ok) {
        const newPosts = data.posts.map((post: Record<string, unknown>) => ({
          ...post,
          publishedAt: new Date(post.publishedAt as string),
          author: typeof post.author === 'string' 
            ? { name: post.author, image: null }
            : post.author as { name: string; image?: string | null },
        }));

        setPosts(prevPosts => (page === 1 ? newPosts : [...prevPosts, ...newPosts]));
        setHasMore(data.pagination ? page < data.pagination.totalPages : false);
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
};

  const fetchRecentPosts = async () => {
    try {
      const params = new URLSearchParams({
        language,
        page: '1',
        limit: '5',
      });

      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();

      if (response.ok) {
        const posts = data.posts.map((post: Record<string, unknown>) => ({
          ...post,
          publishedAt: new Date(post.publishedAt as string),
          author: typeof post.author === 'string' 
            ? { name: post.author, image: null }
            : post.author as { name: string; image?: string | null },
        }));
        // Don't overwrite all posts, this is just for the sidebar
      }
    } catch (error) {
      securityLogger.error('Error fetching recent posts:', error);
        }
};

  useEffect(() => {
    const newCategorizedPosts: Record<string, BlogPost[]> = {};
    posts.forEach(post => {
      const { practiceArea } = post;
      if (!newCategorizedPosts[practiceArea]) {
        newCategorizedPosts[practiceArea] = [];
      }
      newCategorizedPosts[practiceArea].push(post);
    });
    setCategorizedPosts(newCategorizedPosts);
  }, [posts]);

  // Reset page when search or category changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  const trendingTopics =
    language === 'es'
      ? [
          'Reforma Migratoria 2024',
          'Accidentes de Uber',
          'Custodia Compartida',
          'DUI Primera Ofensa',
          'Compensación Laboral',
        ]
      : [
          'Immigration Reform 2024',
          'Uber Accidents',
          'Joint Custody',
          'First DUI Offense',
          'Workers Compensation',
        ];

  return (
    <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="bg-black py-16 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
              <p className="text-xl text-primary font-semibold mb-8">{t.subtitle}</p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pr-12 bg-white/5 backdrop-blur-sm border border-primary/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
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

        {/* Categories Filter */}
        <section className="py-8 bg-black/50 backdrop-blur-sm sticky top-20 z-30 border-b border-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-300">{t.filterBy}</h2>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-sm text-primary hover:underline"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-black font-semibold'
                    : 'bg-white/5 backdrop-blur-sm border border-primary/20 text-gray-300 hover:bg-white/10'
                }`}
              >
                {t.allCategories}
              </button>
              {getAllCategories().map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-black font-semibold'
                      : 'bg-white/5 backdrop-blur-sm border border-primary/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name[language]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                {/* Categorized Posts */}
                {loading && page === 1 ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : Object.keys(categorizedPosts).length === 0 ? (
                  <p className="text-center text-gray-400 py-12">{t.noResults}</p>
                ) : (
                  Object.entries(categorizedPosts).map(([practiceArea, posts]) => (
                    <div key={practiceArea} className="mb-12">
                      <h2 className="text-3xl font-bold text-white mb-6">
                        {getCategoryById(practiceArea)?.name[language] || practiceArea}
                      </h2>
                      <div className="space-y-8">
                        {posts.map((post, index) => {
                          const category = getCategoryById(post.practiceArea);
                          return (
                            <article
                              key={post.id}
                              className="bg-white/5 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                              {post.featuredImage && (
                                <div className="relative h-48 bg-gray-700">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl">{category?.icon || '📰'}</span>
                                  </div>
                                </div>
                              )}
                              <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                  {category && (
                                    <span
                                      className={`px-3 py-1 ${category.lightColor} ${category.textColor} rounded-full text-sm font-medium flex items-center gap-1`}
                                    >
                                      <span>{category.icon}</span>
                                      {category.name[language]}
                                    </span>
                                  )}
                                  <span className="text-sm text-gray-400">
                                    {post.readTime} {t.minRead}
                                  </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">
                                  <Link
                                    href={`/blog/${post.slug}`}
                                    className="hover:text-primary transition-colors"
                                  >
                                    {post.title}
                                  </Link>
                                </h2>
                                <p className="text-gray-400 mb-4">{stripHtml(post.excerpt)}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                      <span className="text-sm">👤</span>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-white">
                                        {post.author.name}
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {t.published}{' '}
                                        {format(post.publishedAt, 'PPP', {
                                          locale: language === 'es' ? es : undefined,
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-primary font-medium hover:underline"
                                  >
                                    {t.readMore} →
                                  </Link>
                                </div>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}

                {/* Load More */}
                {hasMore && !loading && posts.length > 0 && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setPage(page + 1)}
                      className="px-8 py-3 bg-primary text-black rounded-md font-semibold hover:bg-primary/90 transition-colors"
                    >
                      {t.loadMore}
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Category Links */}
                <div className="bg-white/5 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{t.allCategories}</h3>
                  <div className="space-y-3">
                    {getAllCategories().map(category => (
                      <Link
                        key={category.id}
                        href={`/blog/category/${category.slug.en}`}
                        className={`flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl`}>{category.icon}</span>
                          <span className="font-medium text-gray-300 group-hover:text-primary">
                            {category.name[language]}
                          </span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="bg-white/5 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{t.trending}</h3>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-2xl text-primary">🔥</span>
                        <button
                          onClick={() => setSearchQuery(topic)}
                          className="text-gray-300 hover:text-primary transition-colors text-left"
                        >
                          {topic}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{t.newsletter}</h3>
                  <p className="text-sm mb-4 text-gray-300">{t.newsletterDesc}</p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder={t.email}
                      className="w-full px-4 py-2 bg-white/5 border border-primary/20 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary text-black rounded-md font-semibold hover:bg-primary/90 transition-colors"
                    >
                      {t.subscribe}
                    </button>
                  </form>
                </div>

                {/* AI Assistant CTA */}
                <div className="bg-white/5 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🤖</div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {language === 'es' ? '¿Necesita Ayuda Legal?' : 'Need Legal Help?'}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      {language === 'es'
                        ? 'Nuestro asistente de IA está disponible 24/7'
                        : 'Our AI assistant is available 24/7'}
                    </p>
                    <button className="px-4 py-2 bg-primary text-black rounded-md font-semibold hover:bg-primary/90 transition-colors">
                      {language === 'es' ? 'Chatear Ahora' : 'Chat Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
