import BlogPageClient from './BlogPageClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Blog | Immigration, Personal Injury & Criminal Defense | Vasquez Law Firm',
  description:
    'Expert legal insights and information from Vasquez Law Firm. Stay updated on immigration law, personal injury, criminal defense, and more.',
  keywords:
    'legal blog, immigration law, personal injury, criminal defense, legal insights, law firm articles',
  openGraph: {
    title: 'Legal Blog | Vasquez Law Firm',
    description: 'Expert legal insights and information from our experienced attorneys.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/blog',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Legal Blog',
      },
    ],
  },
};

// Full static generation - no revalidation needed

export default function BlogPage() {
  return <BlogPageClient language="en" />;
}
