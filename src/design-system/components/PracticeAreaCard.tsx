'use client';

import React from 'react';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import { Button } from './Button';
import { Text } from './Typography';

interface PracticeAreaCardProps {
  icon: string;
  title: string;
  description: string;
  services: string[];
  aiFeature: string;
  href: string;
  language: 'en' | 'es';
  index?: number;
}

export const PracticeAreaCard: React.FC<PracticeAreaCardProps> = ({
  icon,
  title,
  description,
  services,
  aiFeature,
  href,
  language,
  index = 0,
}) => {
  const content = {
    en: {
      services: 'Services',
      learnMore: 'Learn More',
      getHelp: 'Get Help Now',
    },
    es: {
      services: 'Servicios',
      learnMore: 'Aprender Más',
      getHelp: 'Obtener Ayuda',
    },
  };

  const t = content[language];

  return (
    <div>
      <Card variant="elevated" hover className="h-full flex flex-col">
        <CardHeader>
          <div className="text-5xl mb-4">{icon}</div>
          <CardTitle as="h3" className="text-2xl mb-3">
            {title}
          </CardTitle>
          <Text color="muted">{description}</Text>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="mb-6">
            <h4 className="font-semibold text-neutral-900 mb-3">{t.services}:</h4>
            <ul className="space-y-2">
              {services.slice(0, 4).map((service, i) => (
                <li key={i} className="flex items-start text-sm text-neutral-600">
                  <span className="text-primary mr-2">✓</span>
                  {service}
                </li>
              ))}
              {services.length > 4 && (
                <li className="text-sm text-primary font-medium">+{services.length - 4} more...</li>
              )}
            </ul>
          </div>

          <div className="bg-primary/10 rounded-lg p-4">
            <p className="text-sm font-semibold text-secondary">{aiFeature}</p>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex gap-3">
            <Button href={href} variant="primary" size="sm" fullWidth>
              {t.learnMore}
            </Button>
            <Button variant="outline" size="sm" fullWidth>
              {t.getHelp}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
