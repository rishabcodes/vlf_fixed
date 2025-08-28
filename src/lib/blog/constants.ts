import type { BlogAuthor } from '@/types/blog';

/**
 * Default blog author for Vasquez Law Firm
 * Used across all blog posts and articles
 */
export const DEFAULT_BLOG_AUTHOR: BlogAuthor = {
  id: 'vasquez-law-firm',
  name: 'Vasquez Law Firm',
  email: 'leads@vasquezlawfirm.com',
  bio: 'Expert immigration and personal injury attorneys serving North Carolina and Florida',
  avatar: '/images/authors/vasquez-law-firm.jpg',
  role: 'Law Firm',
  socialLinks: {
    website: 'https://www.vasquezlawnc.com',
    linkedin: 'https://www.linkedin.com/company/vasquez-law-firm',
  },
};

/**
 * Individual attorney authors
 */
export const AUTHORS: Record<string, BlogAuthor> = {
  'william-vasquez': {
    id: 'william-vasquez',
    name: 'William J. Vásquez',
    email: 'wvasquez@vasquezlawnc.com',
    bio: 'Founding attorney and managing partner of Vasquez Law Firm, PLLC',
    avatar: '/images/attorneys/william-vasquez.jpg',
    role: 'Managing Partner',
  },
  'rebecca-sommer': {
    id: 'rebecca-sommer',
    name: 'Rebecca Sommer',
    email: 'rsommer@vasquezlawnc.com',
    bio: 'Immigration attorney dedicated to helping clients achieve their American dream',
    avatar: '/images/attorneys/rebecca-sommer.jpg',
    role: 'Immigration Attorney',
  },
  // Add more attorneys as needed
};
