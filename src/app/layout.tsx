import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { organizationSchema } from '@/lib/schema';
import ClientSessionProvider from '@/components/providers/ClientSessionProvider';
import { Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { NavigationProgress } from '@/components/NavigationProgress';
import { ClientLayoutWrapper } from '@/components/ClientLayoutWrapper';
import { LanguageTogglePortal } from '@/components/lang/LanguageTogglePortal';
import { DOMSafetyInitializer } from '@/components/DOMSafetyInitializer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

// Basic metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com'),
  title: {
    default: 'Vasquez Law Firm - Immigration & Personal Injury Attorneys | YO PELEO POR TI™',
    template: '%s | Vasquez Law Firm',
  },
  description:
    'Trusted immigration and personal injury attorneys serving North Carolina and Florida. Over 30,000 cases won. Free consultation. Se Habla Español.',
  keywords:
    'immigration lawyer, personal injury attorney, Charlotte immigration attorney, Raleigh personal injury lawyer, Orlando immigration lawyer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    url: 'https://www.vasquezlawnc.com',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: '/images/BANNER_TRANS.PNG',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm - YO PELEO POR TI™',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vasquez Law Firm - YO PELEO POR TI™',
    description:
      'Honest, reliable legal representation. Over 30,000 cases won. Call 1-844-YO-PELEO',
    images: ['/images/BANNER_TRANS.PNG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#6B1F2E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${inter.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-black min-h-screen" style={{ fontFamily: 'var(--font-inter)' }} suppressHydrationWarning>
        <DOMSafetyInitializer />
        <NavigationProgress />
        <ClientSessionProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ClientSessionProvider>
        
        {/* Analytics - lazy loaded */}
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <SpeedInsights />
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
