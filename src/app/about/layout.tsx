import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Vasquez Law Firm | Immigration Lawyers in NC & FL | Since 1989',
  description:
    "Learn about Vasquez Law Firm's 60+ years serving North Carolina and Florida. Our experienced immigration lawyers, personal injury attorneys, and criminal defense team fight for you. YO PELEO POR TI™.",
  keywords:
    'immigration lawyer Charlotte NC, immigration attorney Raleigh NC, immigration lawyer Orlando FL, personal injury attorney NC, criminal defense lawyer NC, abogado de inmigración Carolina del Norte',
  openGraph: {
    title: 'About Vasquez Law Firm - YO PELEO POR TI™',
    description:
      "Fighting for immigrants' rights since 1989. Experienced attorneys in immigration, personal injury, and criminal defense across NC & FL.",
    images: ['/images/vasquez-law-firm-team.jpg'],
    url: 'https://vasquezlawnc.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Vasquez Law Firm - YO PELEO POR TI™',
    description:
      "Fighting for immigrants' rights since 1989. Experienced attorneys across NC & FL.",
  },
  alternates: {
    canonical: 'https://vasquezlawnc.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
