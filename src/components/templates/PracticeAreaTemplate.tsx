import React from 'react';
import { Button } from '@/design-system/components/Button';
import { Section, Heading, Text } from './TemplateComponents';
import { COLORS } from '@/design-system/constants';
import Link from 'next/link';
import { Phone } from 'lucide-react';

interface PracticeAreaTemplateProps {
  title: string;
  subtitle?: string;
  description: string;
  content: React.ReactNode;
  metadata?: {
    title: string;
    description: string;
  };
}

export const PracticeAreaTemplate: React.FC<PracticeAreaTemplateProps> = ({
  title,
  subtitle,
  description,
  content,
}) => {
  return (
    <>
      {/* Hero Section with Consistent Design */}
      <Section
        variant="gradient"
        className="text-white py-20"
        style={{
          background: `linear-gradient(135deg, ${COLORS.burgundy[700]} 0%, ${COLORS.burgundy[600]} 100%)`,
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading as="h1" size="6xl" weight="bold" color="white" className="mb-4">
            {title}
          </Heading>
          {subtitle && (
            <Heading as="h2" size="3xl" color="white" className="mb-4 opacity-90">
              {subtitle}
            </Heading>
          )}
          <Text size="xl" color="white" className="md:text-2xl max-w-3xl opacity-90">
            {description}
          </Text>
        </div>
      </Section>

      {/* Main Content */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">{content}</div>
        </div>
      </Section>

      {/* CTA Section with Consistent Design */}
      <Section variant="default" className="py-16" style={{ backgroundColor: COLORS.gold[500] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading as="h2" size="4xl" weight="bold" color="white" className="mb-4">
            Need Legal Help?
          </Heading>
          <Text size="xl" color="white" className="opacity-90 mb-8">
            Contact our experienced attorneys today for a consultation
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as="a"
              href="tel:1-844-YO-PELEO"
              variant="secondary"
              size="lg"
              className="inline-flex items-center justify-center"
              style={{
                backgroundColor: COLORS.neutral[0],
                color: COLORS.burgundy[700],
              }}
            >
              <Phone className="w-5 h-5 mr-2" />
              1-844-YO-PELEO
            </Button>
            <Button
              as={Link} href="/contact"
              variant="primary"
              size="lg"
              style={{
                backgroundColor: COLORS.burgundy[700],
                color: COLORS.neutral[0],
              }}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default PracticeAreaTemplate;
