'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

interface BlogSEOProps {
  post: {
    title: string;
    metaDescription?: string;
    excerpt?: string;
    featuredImage?: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
    keywords?: string[];
    categories?: string[];
    language: 'en' | 'es';
    slug: string;
    readTime?: number;
  };
  isListingPage?: boolean;
}

export function BlogSEO({ post, isListingPage = false }: BlogSEOProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';
  const canonicalUrl = `${baseUrl}${pathname}`;

  const description =
    post.metaDescription ||
    post.excerpt ||
    `Expert legal insights from Vasquez Law Firm. ${post.language === 'es' ? 'YO PELEO POR TI™' : 'I FIGHT FOR YOU'}`;

  // Removed unused title variable - title is handled by Next.js metadata

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': isListingPage ? 'Blog' : 'BlogPosting',
    headline: post.title,
    description: description,
    image: post.featuredImage || `${baseUrl}/images/blog-default.jpg`,
    author: {
      '@type': 'Organization',
      name: 'Vasquez Law Firm, PLLC',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
      sameAs: [
        'https://www.facebook.com/VasquezLawFirm',
        'https://www.linkedin.com/company/vasquez-law-firm',
        'https://www.youtube.com/channel/UC_VasquezLaw',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vasquez Law Firm, PLLC',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 200,
        height: 60,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: post.keywords?.join(', ') || '',
    articleSection: post.categories?.[0] || 'Legal',
    inLanguage: post.language === 'es' ? 'es-US' : 'en-US',
    isAccessibleForFree: true,
    about: {
      '@type': 'Thing',
      name: 'Legal Services',
      description:
        post.language === 'es'
          ? 'Servicios legales especializados en inmigración, lesiones personales, compensación laboral y más.'
          : 'Specialized legal services in immigration, personal injury, workers compensation and more.',
    },
  } as Record<string, unknown>), [post, isListingPage, baseUrl, canonicalUrl, description]);

  // Add reading time for blog posts
  if (!isListingPage && post.readTime) {
    (structuredData as Record<string, unknown>).wordCount = post.readTime * 200; // Approximate word count
    (structuredData as Record<string, unknown>).timeRequired = `PT${post.readTime}M`;
  }

  // Add organization schema for the law firm
  const organizationSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Vasquez Law Firm, PLLC',
    alternateName: 'YO PELEO POR TI™',
    description:
      post.language === 'es'
        ? 'Bufete de abogados especializado en inmigración, lesiones personales, compensación laboral, defensa criminal y derecho familiar.'
        : 'Law firm specializing in immigration, personal injury, workers compensation, criminal defense, and family law.',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    image: `${baseUrl}/images/office-hero.jpg`,
    telephone: '+1-844-967-3536',
    email: 'leads@vasquezlawfirm.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '123 Main Street',
        addressLocality: 'Charlotte',
        addressRegion: 'NC',
        postalCode: '28202',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '456 Oak Avenue',
        addressLocality: 'Raleigh',
        addressRegion: 'NC',
        postalCode: '27601',
        addressCountry: 'US',
      },
    ],
    geo: [
      {
        '@type': 'GeoCoordinates',
        latitude: '35.2271',
        longitude: '-80.8431',
      },
      {
        '@type': 'GeoCoordinates',
        latitude: '35.7796',
        longitude: '-78.6382',
      },
    ],
    areaServed: ['North Carolina', 'Florida', 'Charlotte', 'Raleigh', 'Durham', 'Orlando'],
    serviceType: [
      'Immigration Law',
      'Personal Injury Law',
      'Workers Compensation',
      'Criminal Defense',
      'Family Law',
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Check', 'Credit Card'],
    openingHours: 'Mo-Fr 09:00-17:00',
    sameAs: [
      'https://www.facebook.com/VasquezLawFirm',
      'https://www.linkedin.com/company/vasquez-law-firm',
      'https://www.youtube.com/channel/UC_VasquezLaw',
    ],
  }), [post.language, baseUrl]);

  // FAQ Schema if this is a blog post with common legal questions
  const faqSchema = useMemo(() => post.categories?.includes('immigration')
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name:
              post.language === 'es'
                ? '¿Cómo puede ayudarme Vasquez Law Firm con mi caso de inmigración?'
                : 'How can Vasquez Law Firm help with my immigration case?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                post.language === 'es'
                  ? 'Nuestro equipo de abogados de inmigración tiene años de experiencia ayudando a clientes con visas, ciudadanía, asilo, y más. YO PELEO POR TI™.'
                  : 'Our immigration law team has years of experience helping clients with visas, citizenship, asylum, and more. I FIGHT FOR YOU.',
            },
          },
        ],
      }
    : null, [post.categories, post.language]);

  // Inject structured data into document head
  React.useEffect(() => {
    // Add structured data scripts
    const structuredScript = document.createElement('script');
    structuredScript.type = 'application/ld+json';
    structuredScript.text = JSON.stringify(structuredData);
    document.head.appendChild(structuredScript);

    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    if (faqSchema) {
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.text = JSON.stringify(faqSchema);
      document.head.appendChild(faqScript);
    }

    // Cleanup function
    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        if ((script as HTMLScriptElement).text.includes(post.title)) {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }});
    };
  }, [post.title, structuredData, organizationSchema, faqSchema]);

  return null; // This component doesn't render anything visible
}
}
