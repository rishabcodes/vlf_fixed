import { getCategoryById, BlogCategoryId } from '@/lib/blog/categories';

interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate?: string;
  authorName: string;
  categoryId: string;
  imageUrl?: string;
  slug: string;
  language: 'en' | 'es';
}

export function BlogPostStructuredData({
  title,
  description,
  publishedDate,
  modifiedDate,
  authorName,
  categoryId,
  imageUrl,
  slug,
  language,
}: BlogPostStructuredDataProps) {
  const category = getCategoryById(categoryId);
  const baseUrl = 'https://www.vasquezlawnc.com';
  const langPrefix = language === 'es' ? '/es' : '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vasquez Law Firm, PLLC',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${langPrefix}/blog/${slug}`,
    },
    articleSection: category?.name[language] || 'Legal',
    keywords: category?.keywords.join(', ') || '',
    inLanguage: language === 'es' ? 'es-US' : 'en-US',
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BlogCategoryStructuredDataProps {
  categoryId: BlogCategoryId;
  language: 'en' | 'es';
}

export function BlogCategoryStructuredData({
  categoryId,
  language,
}: BlogCategoryStructuredDataProps) {
  const category = getCategoryById(categoryId);
  if (!category) return null;

  const baseUrl = 'https://www.vasquezlawnc.com';
  const langPrefix = language === 'es' ? '/es' : '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name[language]} Blog Articles`,
    description: category.description[language],
    url: `${baseUrl}${langPrefix}/blog/category/${categoryId}`,
    inLanguage: language === 'es' ? 'es-US' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Vasquez Law Firm, PLLC',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: language === 'es' ? 'Inicio' : 'Home',
          item: `${baseUrl}${langPrefix}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${baseUrl}${langPrefix}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name[language],
          item: `${baseUrl}${langPrefix}/blog/category/${categoryId}`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BlogListStructuredDataProps {
  language: 'en' | 'es';
}

export function BlogListStructuredData({ language }: BlogListStructuredDataProps) {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const langPrefix = language === 'es' ? '/es' : '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: language === 'es' ? 'Blog Legal de Vasquez Law Firm' : 'Vasquez Law Firm Legal Blog',
    description:
      language === 'es'
        ? 'Perspectivas legales expertas y actualizaciones sobre inmigración, lesiones personales, defensa criminal y más en Carolina del Norte y Florida'
        : 'Expert legal insights and updates on immigration, personal injury, criminal defense, and more in North Carolina and Florida',
    url: `${baseUrl}${langPrefix}/blog`,
    inLanguage: language === 'es' ? 'es-US' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Vasquez Law Firm, PLLC',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-844-967-3536',
        contactType: 'customer service',
        areaServed: ['US'],
        availableLanguage: ['English', 'Spanish'],
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}${langPrefix}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
