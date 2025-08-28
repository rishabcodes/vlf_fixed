'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BlogAnalytics, BlogReadingProgress, trackSocialShare } from './BlogAnalytics';
import { BlogSEO } from './BlogSEO';
import { stripHtml } from '@/lib/utils/stripHtml';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  metaDescription: string;
  practiceArea: string;
  language: 'en' | 'es';
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  author: string;
  keywords: string[];
  faqSection?: Array<{
    question: string;
    answer: string;
  }>;
  viewCount: number;
  seoScore: number;
  translations: Array<{
    id: string;
    slug: string;
    language: string;
  }>;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
}

interface EnhancedBlogPostProps {
  post: BlogPost;
  relatedPosts: RelatedPost[];
  language: 'en' | 'es';
}

export function EnhancedBlogPost({ post, relatedPosts, language }: EnhancedBlogPostProps) {
  // Removed unused isShareMenuOpen state - share functionality is handled inline
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);

  const content = {
    en: {
      by: 'By',
      published: 'Published',
      updated: 'Updated',
      minRead: 'min read',
      views: 'views',
      share: 'Share',
      relatedArticles: 'Related Articles',
      faq: 'Frequently Asked Questions',
      toc: 'Table of Contents',
      backToBlog: '← Back to Blog',
      readInSpanish: 'Leer en Español',
      readInEnglish: 'Read in English',
      shareOn: 'Share on',
      copyLink: 'Copy Link',
      linkCopied: 'Link copied!',
      callToAction: 'Need Legal Help?',
      ctaDescription: 'Get a free consultation with our experienced attorneys',
      ctaButton: 'Schedule Consultation',
      ctaPhone: 'Call 1-844-YO-PELEO',
      printArticle: 'Print Article',
      emailArticle: 'Email Article',
      tags: 'Tags',
      category: 'Category',
      lastUpdated: 'Last Updated',
      readingTime: 'Reading Time',
      expertAdvice: 'Expert Legal Advice',
      legalDisclaimer:
        'This blog post is for informational purposes only and does not constitute legal advice. For specific legal guidance, please consult with our attorneys.',
    },
    es: {
      by: 'Por',
      published: 'Publicado',
      updated: 'Actualizado',
      minRead: 'min de lectura',
      views: 'vistas',
      share: 'Compartir',
      relatedArticles: 'Artículos Relacionados',
      faq: 'Preguntas Frecuentes',
      toc: 'Tabla de Contenidos',
      backToBlog: '← Volver al Blog',
      readInSpanish: 'Leer en Español',
      readInEnglish: 'Read in English',
      shareOn: 'Compartir en',
      copyLink: 'Copiar Enlace',
      linkCopied: '¡Enlace copiado!',
      callToAction: '¿Necesita Ayuda Legal?',
      ctaDescription: 'Obtenga una consulta gratuita con nuestros abogados experimentados',
      ctaButton: 'Programar Consulta',
      ctaPhone: 'Llame al 1-844-YO-PELEO',
      printArticle: 'Imprimir Artículo',
      emailArticle: 'Enviar por Email',
      tags: 'Etiquetas',
      category: 'Categoría',
      lastUpdated: 'Última Actualización',
      readingTime: 'Tiempo de Lectura',
      expertAdvice: 'Consejo Legal Experto',
      legalDisclaimer:
        'Esta publicación de blog es solo para fines informativos y no constituye asesoramiento legal. Para orientación legal específica, consulte con nuestros abogados.',
    },
  };

  const t = content[language];

  // Generate table of contents from headings
  useEffect(() => {
    const headings = document.querySelectorAll(
      '#blog-content h2, #blog-content h3, #blog-content h4'
    );
    const toc = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      };
    });
    setTableOfContents(toc);
  }, [post.content]);

  const sharePost = (platform: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${language === 'es' ? 'es/' : ''}blog/${post.slug}`;
    const text = post.title;

    trackSocialShare(platform, post.slug, language);

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}&hashtags=YoPeleo,VasquezLaw`
        );
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        );
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`);
        break;
      case 'email':
        window.open(
          `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`Check out this article: ${text}\n\n${url}`)}`
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopyLinkSuccess(true);
          setTimeout(() => setCopyLinkSuccess(false), 2000);
        });
        break;
        }
};

  const practiceAreaColors = {
    immigration: 'bg-blue-100 text-blue-800',
    'personal-injury': 'bg-red-100 text-red-800',
    'workers-compensation': 'bg-green-100 text-green-800',
    'criminal-defense': 'bg-purple-100 text-purple-800',
    'family-law': 'bg-pink-100 text-pink-800',
    'traffic-violations': 'bg-yellow-100 text-yellow-800',
    general: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="min-h-screen bg-white">
      <BlogSEO post={post} />
      <BlogAnalytics
        postSlug={post.slug}
        language={language}
        action="view"
        category={post.practiceArea}
      />
      <BlogReadingProgress contentId="blog-content" />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href={language === 'es' ? '/es/blog' : '/blog'}

                className="text-[#C9974D] hover:underline flex items-center gap-2"
            >
              <svg
                className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t.backToBlog}
            </Link>
          </nav>

          {/* Category & Metrics */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${practiceAreaColors[post.practiceArea as keyof typeof practiceAreaColors] || practiceAreaColors.general}`}
            >
              {post.practiceArea.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readTime} {t.minRead}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {post.viewCount.toLocaleString()} {t.views}
            </span>
            {post.seoScore >= 90 && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                SEO {post.seoScore}%
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#6B1F2E] rounded-full flex items-center justify-center text-white font-semibold">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {t.by} {post.author}
                </p>
                <p className="text-xs">
                  {t.published}{' '}
                  {format(new Date(post.publishedAt), 'PPP', {
                    locale: language === 'es' ? es : undefined,
                  })}
                </p>
              </div>
            </div>
            {post.updatedAt !== post.publishedAt && (
              <div className="text-xs">
                {t.lastUpdated}:{' '}
                {format(new Date(post.updatedAt), 'PPP', {
                  locale: language === 'es' ? es : undefined,
                })}
              </div>
            )}
          </div>

          {/* Translation Link */}
          {post.translations.length > 0 && (
            <div className="mb-8">
              {post.translations.map(translation => (
                <Link
                  key={translation.id}

                href={`/${translation.language === 'es' ? 'es/' : ''}blog/${translation.slug}`}

                className="inline-flex items-center gap-2 text-[#C9974D] hover:underline"
                >
                  🌐 {translation.language === 'es' ? t.readInSpanish : t.readInEnglish}
                </Link>
              ))}
            </div>
          )}

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden bg-gray-200">
              <Image
                src={post.featuredImage}

                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
            </div>
          )}

          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.toc}</h2>
              <nav>
                <ul className="space-y-2">
                  {tableOfContents.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}

                className={`text-[#C9974D] hover:underline block ${
                          item.level === 3 ? 'ml-4' : item.level === 4 ? 'ml-8' : ''
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">{t.share}:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => sharePost('twitter')}

                className="p-2 text-gray-600 hover:text-[#1DA1F2] transition-colors rounded-full hover:bg-blue-50"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button
                onClick={() => sharePost('facebook')}

                className="p-2 text-gray-600 hover:text-[#1877F2] transition-colors rounded-full hover:bg-blue-50"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                onClick={() => sharePost('linkedin')}

                className="p-2 text-gray-600 hover:text-[#0A66C2] transition-colors rounded-full hover:bg-blue-50"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              <button
                onClick={() => sharePost('whatsapp')}

                className="p-2 text-gray-600 hover:text-[#25D366] transition-colors rounded-full hover:bg-green-50"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </button>
              <button
                onClick={() => sharePost('copy')}

                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50"
                aria-label="Copy link"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
            {copyLinkSuccess && (
              <span className="text-sm text-green-600 font-medium">{t.linkCopied}</span>
            )}
          </div>

          {/* Article Content */}
          <div
            id="blog-content"
            className="prose prose-lg max-w-none mb-12 prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-[#C9974D] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Expert Advice Banner */}
          <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] rounded-lg p-6 text-white mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{t.expertAdvice}</h3>
                <p className="text-sm opacity-90">{t.legalDisclaimer}</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          {post.faqSection && post.faqSection.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.faq}</h2>
              <div className="space-y-6">
                {post.faqSection.map((faq, index) => (
                  <div key={index}

                className="border-b border-gray-200 pb-4 last:border-0">
                    <h3
                className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords/Tags */}
          {post.keywords.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-medium text-gray-700 mb-3">{t.tags}:</h3>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword, index) => (
                  <span
                    key={index}

                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] rounded-lg p-8 text-white text-center mb-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">{t.callToAction}</h3>
              <p className="text-lg mb-6 opacity-90">{t.ctaDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-white text-[#6B1F2E] rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  {t.ctaButton}
                </Link>
                <a
                  href="tel:+18449673536"
                  className="inline-block px-8 py-3 bg-[#C9974D] text-white rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
                >
                  {t.ctaPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <article
                  key={related.id}

                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {related.featuredImage && (
                    <div className="relative h-48">
                      <Image
                        src={related.featuredImage}

                alt={related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <Link
                        href={`/${language === 'es' ? 'es/' : ''}blog/${related.slug}`}

                className="hover:text-[#C9974D] transition-colors"
                      >
                        {related.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{stripHtml(related.excerpt)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {format(new Date(related.publishedAt), 'MMM d, yyyy')}
                      </span>
                      <Link
                        href={`/${language === 'es' ? 'es/' : ''}blog/${related.slug}`}

                className="text-[#C9974D] font-medium hover:underline"
                      >
                        {language === 'es' ? 'Leer Más →' : 'Read More →'}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
