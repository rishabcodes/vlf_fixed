'use client';

import React, { useState, useEffect } from 'react';

import {
  Clock,
  Calendar,
  User,
  Search,
  Filter,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { stripHtml } from '@/lib/utils/stripHtml';
import type { BlogPost } from '@/types/blog';

interface BlogPageTemplateProps {
  posts: BlogPost[];
  categories: Array<{
    id: string;
    name: { en: string; es: string };
    slug: { en: string; es: string };
    icon: string;
    postCount: number;
  }>;
  isArticlePage?: boolean;
  currentPost?: BlogPost;
  relatedPosts?: BlogPost[];
}

export const BlogPageTemplate: React.FC<BlogPageTemplateProps> = ({
  posts,
  categories,
  isArticlePage = false,
  currentPost,
  relatedPosts = [],
}) => {
  const [language] = useState<'en' | 'es'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [readingProgress, setReadingProgress] = useState(0);

  // Filter posts
  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.practiceArea === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery]);

  // Reading progress for article pages
  useEffect(() => {
    if (!isArticlePage) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isArticlePage]);

  const content = {
    en: {
      title: 'Legal Insights & Resources',
      subtitle: 'Stay informed with expert legal analysis and updates',
      search: 'Search articles...',
      filter: 'Filter by Category',
      all: 'All Articles',
      trending: 'Trending Topics',
      recent: 'Recent Articles',
      readMore: 'Read Article',
      minRead: 'min read',
      views: 'views',
      share: 'Share Article',
      related: 'Related Articles',
      newsletter: 'Subscribe to Our Newsletter',
      newsletterDesc: 'Get weekly legal insights delivered to your inbox',
      subscribe: 'Subscribe',
    },
    es: {
      title: 'Perspectivas y Recursos Legales',
      subtitle: 'Manténgase informado con análisis legal experto',
      search: 'Buscar artículos...',
      filter: 'Filtrar por Categoría',
      all: 'Todos los Artículos',
      trending: 'Temas Tendencia',
      recent: 'Artículos Recientes',
      readMore: 'Leer Artículo',
      minRead: 'min de lectura',
      views: 'vistas',
      share: 'Compartir Artículo',
      related: 'Artículos Relacionados',
      newsletter: 'Suscríbase a Nuestro Boletín',
      newsletterDesc: 'Reciba información legal semanal en su correo',
      subscribe: 'Suscribirse',
    },
  };

  const t = content[language];

  // Article Page Layout
  if (isArticlePage && currentPost) {
    return (
      <>
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div className="h-full bg-blue-600" style={{ width: `${readingProgress}%` }} />
        </div>

        {/* Article Header */}
        <article className="bg-white">
          <header className="py-16 bg-gray-50">
            <div className="container max-w-4xl mx-auto px-4">
              {/* Category Badge */}
              <Link
                href={`/blog/category/${currentPost.practiceArea}`}

                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
              >
                <span className="text-lg mr-2">
                  {categories.find(c => c.id === currentPost.practiceArea)?.icon}
                </span>
                <span className="font-medium">
                  {categories.find(c => c.id === currentPost.practiceArea)?.name[language]}
                </span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {currentPost.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{currentPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {format(currentPost.publishedAt, 'PPP', {
                        locale: language === 'es' ? es : undefined,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>
                      {currentPost.readTime} {t.minRead}
                    </span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 mr-2">{t.share}:</span>
                  <button className="text-gray-600 hover:text-blue-600">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="py-12">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="prose prose-lg max-w-none">
                {/* Article content would go here */}
                <div dangerouslySetInnerHTML={{ __html: currentPost.content || '' }} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {currentPost.tags.map((tag, index) => (
                    <span
                      key={index}

                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="container max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.related}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.slice(0, 3).map(post => (
                    <BlogCard key={post.id} post={post} language={language} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </>
    );
  }

  // Blog Listing Page
  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-0 z-40 bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4 overflow-x-auto">
              <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <button
                onClick={() => setSelectedCategory('all')}

                className={cn(
                  'px-4 py-2 rounded-full whitespace-nowrap transition-all',
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {t.all}
              </button>
              {categories.map(category => (
                <button
                  key={category.id}

                onClick={() => setSelectedCategory(category.id)}

                className={cn(
                    'px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-2',
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <span>{category.icon}</span>
                  {category.name[language]}
                  <span className="text-xs">({category.postCount})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                <div className="grid gap-8">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} language={language} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Trending Topics */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    {t.trending}
                  </h3>
                  <div className="space-y-3">
                    {['Immigration Reform 2024', 'DUI Defense Strategies', 'Workers Rights'].map(
                      (topic, index) => (
                        <button
                          key={index}

                onClick={() => setSearchQuery(topic)}

                className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          {topic}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.newsletter}</h3>
                  <p className="text-gray-600 mb-4">{t.newsletterDesc}</p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {t.subscribe}
                    </button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Blog Card Component
const BlogCard: React.FC<{ post: BlogPost; language: 'en' | 'es' }> = ({ post, language }) => {
  const t =
    language === 'en'
      ? {
          readMore: 'Read Article',
          minRead: 'min read',
          views: 'views',
        }
      : {
          readMore: 'Leer Artículo',
          minRead: 'min de lectura',
          views: 'vistas',
        };

  return (
    <article
className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden"
    >
      {post.featuredImage && (
        <div className="aspect-video bg-gray-200">{/* Featured image would go here */}</div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime} {t.minRead}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(post.publishedAt, 'PP', {
              locale: language === 'es' ? es : undefined,
            })}
          </span>
          {post.views && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {post.views} {t.views}
            </span>
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          <Link href={`/blog/${post.slug}`}

                className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{stripHtml(post.excerpt)}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}

                className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            {t.readMore}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPageTemplate;
