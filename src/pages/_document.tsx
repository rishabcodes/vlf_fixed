import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to font providers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          as="style"
        />

        {/* Load fonts with font-display: swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />

        {/* Resource hints for critical resources */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Inline critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for above-fold content */
              body {
                margin: 0;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              
              /* Prevent layout shift from font loading */
              .font-inter { font-family: 'Inter', sans-serif; }
              .font-playfair { font-family: 'Playfair Display', serif; }
              
              /* Critical layout styles */
              * {
                box-sizing: border-box;
              }
              
              /* Hide content until fonts load */
              .font-loading {
                visibility: hidden;
              }
              
              /* Loading skeleton styles */
              .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
              }
              
              @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              
              /* Prevent CLS from images */
              img {
                max-width: 100%;
                height: auto;
              }
              
              /* Critical responsive utilities */
              @media (max-width: 640px) {
                .sm\\:hidden { display: none; }
              }
            `,
          }}
        />

        {/* Optimize font loading with JavaScript */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Font loading optimization
              if ('fonts' in document) {
                Promise.all([
                  document.fonts.load('400 1em Inter'),
                  document.fonts.load('700 1em Inter'),
                  document.fonts.load('400 1em Playfair Display'),
                ]).then(() => {
                  document.documentElement.classList.add('fonts-loaded');
                });
              }
              
              // Add loading class
              document.documentElement.classList.add('font-loading');
              
              // Remove loading class when fonts are ready
              document.addEventListener('DOMContentLoaded', () => {
                if (document.fonts && document.fonts.ready) {
                  document.fonts.ready.then(() => {
                    document.documentElement.classList.remove('font-loading');
                  });
                }
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* Lazy load non-critical scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Lazy load Google Analytics
              window.addEventListener('load', () => {
                setTimeout(() => {
                  const script = document.createElement('script');
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + (window.GA_MEASUREMENT_ID || '');
                  script.async = true;
                  document.head.appendChild(script);
                }, 3000);
              });
            `,
          }}
        />
      </body>
    </Html>
  );
}
