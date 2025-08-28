/**
 * Critical CSS for above-the-fold content
 * This should be inlined in the HTML head for optimal performance
 */

export const criticalCSS = `
  /* Reset and base styles */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    margin: 0;
    font-family: inherit;
    line-height: inherit;
    background-color: #000;
    color: #fff;
  }
  
  /* Critical layout styles */
  .min-h-screen {
    min-height: 100vh;
  }
  
  .relative {
    position: relative;
  }
  
  .absolute {
    position: absolute;
  }
  
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  .z-10 {
    z-index: 10;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .items-center {
    align-items: center;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .text-center {
    text-align: center;
  }
  
  /* Critical typography */
  .text-6xl {
    font-size: 3.75rem;
    line-height: 1;
  }
  
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  
  .font-black {
    font-weight: 900;
  }
  
  .font-bold {
    font-weight: 700;
  }
  
  /* Critical colors */
  .bg-black {
    background-color: #000;
  }
  
  .text-white {
    color: #fff;
  }
  
  .bg-gradient-to-b {
    background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
  }
  
  .from-secondary\/90 {
    --tw-gradient-from: rgb(139 38 53 / 0.9);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }
  
  .via-black\/80 {
    --tw-gradient-stops: var(--tw-gradient-from), rgb(0 0 0 / 0.8), var(--tw-gradient-to);
  }
  
  .to-black {
    --tw-gradient-to: #000;
  }
  
  /* Critical animations */
  @media (prefers-reduced-motion: no-preference) {
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
  
  /* Responsive utilities */
  @media (min-width: 768px) {
    .md\\:text-8xl {
      font-size: 6rem;
      line-height: 1;
    }
    
    .md\\:text-3xl {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
`;

/**
 * Generate critical CSS for a specific page
 */
export function getCriticalCSS(pageName?: string): string {
  let css = criticalCSS;

  // Add page-specific critical CSS
  switch (pageName) {
    case 'home':
      css += `
        /* Hero specific styles */
        .hero-gradient {
          background: linear-gradient(135deg, #8B2635 0%, #000 100%);
        }
      `;
      break;
    case 'contact':
      css += `
        /* Contact form styles */
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 0.375rem;
        }
      `;
      break;
  }

  return css.replace(/\s+/g, ' ').trim();
}

/**
 * Inline critical CSS in the document head
 */
export function inlineCriticalCSS(css: string): string {
  return `<style>${css}</style>`;
}
