import React from 'react';
import Link from 'next/link';
import { generateContextualLinks } from '@/lib/seo/internal-linking-mesh';

interface ContentInternalLinksProps {
  content: string;
  currentPage?: {
    type: string;
    location?: string;
    service?: string;
  };
  maxLinksPerParagraph?: number;
}

// Keywords to link mapping
const KEYWORD_MAPPINGS = [
  // Practice area keywords
  {
    keywords: ['immigration', 'green card', 'visa', 'deportation'],
    link: '/practice-areas/immigration',
  },
  {
    keywords: ['personal injury', 'accident', 'injured', 'injury'],
    link: '/practice-areas/personal-injury',
  },
  {
    keywords: ['criminal', 'arrest', 'charged', 'crime'],
    link: '/practice-areas/criminal-defense',
  },
  {
    keywords: ['workers comp', 'work injury', 'workplace accident'],
    link: '/practice-areas/workers-compensation',
  },

  // Location keywords
  { keywords: ['charlotte', 'queen city'], link: '/locations/nc/charlotte' },
  { keywords: ['raleigh', 'capital city'], link: '/locations/nc/raleigh' },
  { keywords: ['durham', 'bull city'], link: '/locations/nc/durham' },
  { keywords: ['greensboro'], link: '/locations/nc/greensboro' },

  // Service keywords
  {
    keywords: ['car accident', 'auto accident', 'vehicle crash'],
    link: '/practice-areas/personal-injury/car-accidents',
  },
  {
    keywords: ['truck accident', '18-wheeler'],
    link: '/practice-areas/personal-injury/truck-accidents',
  },
  {
    keywords: ['dwi', 'dui', 'drunk driving'],
    link: '/practice-areas/criminal-defense/dwi-drunk-driving',
  },
  {
    keywords: ['citizenship', 'naturalization'],
    link: '/practice-areas/immigration/citizenship-naturalization',
  },

  // Action keywords
  { keywords: ['free consultation', 'consult', 'consultation'], link: '/contact' },
  { keywords: ['call now', 'contact us', 'get help'], link: '/contact' },
  { keywords: ['near me', 'nearby', 'close to me'], link: '/near-me' },
  { keywords: ['emergency', '24/7', 'urgent'], link: '/contact?emergency=true' },
];

export function ContentInternalLinks({
  content,
  currentPage,
  maxLinksPerParagraph = 2,
}: ContentInternalLinksProps) {
  // Function to add internal links to text
  const addInternalLinks = (text: string): React.ReactNode => {
    const processedText = text;
    const addedLinks: Array<{ start: number; end: number; element: React.ReactElement }> = [];
    let linkCount = 0;

    // Sort keywords by length (longest first) to avoid partial matches
    const sortedMappings = [...KEYWORD_MAPPINGS].sort(
      (a, b) => (b.keywords[0]?.length || 0) - (a.keywords[0]?.length || 0)
    );

    sortedMappings.forEach(mapping => {
      if (linkCount >= maxLinksPerParagraph) return;

      mapping.keywords.forEach(keyword => {
        if (linkCount >= maxLinksPerParagraph) return;

        const regex = new RegExp(`\\b(${keyword})s?\\b`, 'gi');
        const match = regex.exec(processedText);

        if (match && match.index !== undefined) {
          // Check if this position already has a link
          const overlaps = addedLinks.some(
            link =>
              (match.index >= link.start && match.index < link.end) ||
              (match.index + match[0].length > link.start &&
                match.index + match[0].length <= link.end)
          );

          if (!overlaps) {
            addedLinks.push({
              start: match.index,
              end: match.index + match[0].length,
              element: (
                <Link
                  key={`${mapping.link}-${match.index}` href={mapping.link}

                className="text-primary hover:text-primary-300 underline font-medium"
                >
                  {match[0]}
                </Link>
              ),
            });
            linkCount++;
          }});
    });

    // Sort links by position
    addedLinks.sort((a, b) => a.start - b.start);

    // Build the final text with links
    if (addedLinks.length === 0) return text;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    addedLinks.forEach(link => {
      // Add text before the link
      if (link.start > lastIndex) {
        elements.push(text.substring(lastIndex, link.start));
      }
      // Add the link
      elements.push(link.element);
      lastIndex = link.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  // Process content paragraphs
  const paragraphs = content.split('\n\n');
  const processedParagraphs = paragraphs.map((paragraph, index) => {
    const processedContent = addInternalLinks(paragraph);

    return (
      <p key={index}

                className="mb-4">
        {processedContent}
      </p>
    );
  });

  // Add contextual links section
  const contextualLinks: Array<{ text: string; href: string; title: string }> = currentPage
    ? generateContextualLinks(currentPage, 5)
    : [];

  return (
    <div className="content-with-internal-links">
      {processedParagraphs}

      {contextualLinks.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Related Legal Services</h3>
          <div className="flex flex-wrap gap-3">
            {contextualLinks.map((link, index) => (
              <Link
                key={index}

                href={link.href}
                title={link.title} className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:text-primary hover:border-primary transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Utility component for adding links to existing content
export function AutoLinkContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const processNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return <ContentInternalLinks content={node} />;
    }

    if (React.isValidElement(node)) {
      // Don't process links or certain elements
      if (node.type === 'a' || node.type === Link) {
        return node;
      }

      // Process children of the element
      const children = React.Children.map((node.props as any).children, processNode);
      return React.cloneElement(node, {}, children);
    }

    if (Array.isArray(node)) {
      return node.map((child, index) => (
        <React.Fragment key={index}>{processNode(child)}</React.Fragment>
      ));
    }

    return node;
  };

  return <div className={`auto-linked-content ${className}`}>{processNode(children)}</div>;
}
}
}
