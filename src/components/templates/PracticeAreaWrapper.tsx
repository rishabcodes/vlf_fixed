import React from 'react';
import StandardizedPracticeAreaTemplate from './StandardizedPracticeAreaTemplate';
import { practiceAreaContent } from '@/data/practice-area-content';

interface PracticeAreaWrapperProps {
  practiceArea: string;
  subArea: string;
  language: 'en' | 'es';
}

const PracticeAreaWrapper: React.FC<PracticeAreaWrapperProps> = ({
  practiceArea,
  subArea,
  language,
}) => {
  // Get content based on practice area, sub area, and language
  const content = practiceAreaContent[language]?.[practiceArea]?.[subArea];

  if (!content) {
    // Fallback content
    const isSpanish = language === 'es';
    return (
      <StandardizedPracticeAreaTemplate
        title={isSpanish ? 'Área de Práctica' : 'Practice Area'}
        description={isSpanish ? 'Información próximamente' : 'Information coming soon'}
        overview={{
          content: isSpanish
            ? 'Estamos trabajando en proporcionar información detallada sobre esta área de práctica. Por favor, contáctenos para más información.'
            : 'We are working on providing detailed information about this practice area. Please contact us for more information.',
        }}
        services={[]}
        faqs={[]}
        isSpanish={isSpanish}
      />
    );
  }

  return <StandardizedPracticeAreaTemplate {...content} isSpanish={language === 'es'} />;
};

export default PracticeAreaWrapper;