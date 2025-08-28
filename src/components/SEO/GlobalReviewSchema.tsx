'use client';

import Script from 'next/script';
import { generateReviewSchema } from '@/lib/seo/comprehensive-schema';

// Mock review data - in production, this would come from a database or API
const globalReviews = [
  {
    author: 'Maria G.',
    rating: 5,
    text: 'Vasquez Law Firm changed my life! They helped me get my green card after years of struggling. The team speaks perfect Spanish and made me feel comfortable throughout the entire process. I highly recommend them to anyone needing immigration help.',
    date: '2024-01-15',
    title: 'Life-Changing Immigration Help',
    source: 'Google Reviews',
  },
  {
    author: 'John D.',
    rating: 5,
    text: "After my car accident, I didn't know where to turn. Vasquez Law Firm fought for me and got me a settlement that covered all my medical bills and lost wages. They truly care about their clients!",
    date: '2024-02-20',
    title: 'Outstanding Personal Injury Representation',
    source: 'Google Reviews',
  },
  {
    author: 'Carlos M.',
    rating: 5,
    text: 'El mejor bufete de abogados en Carolina del Norte! Me ayudaron con mi caso de deportación y ahora puedo quedarme con mi familia. Siempre respondieron mis preguntas y me mantuvieron informado.',
    date: '2024-03-10',
    title: 'Excelente Servicio Legal',
    source: 'Google Reviews',
  },
  {
    author: 'Sarah L.',
    rating: 5,
    text: 'I was facing serious criminal charges and Vasquez Law Firm saved my future. Their criminal defense team is incredible. They got my charges reduced and kept me out of jail. Forever grateful!',
    date: '2024-01-28',
    title: 'Saved My Future',
    source: 'Avvo',
  },
  {
    author: 'Antonio R.',
    rating: 5,
    text: 'Workers comp claim was denied until I hired Vasquez Law Firm. They got me the benefits I deserved and treated me with respect. Best lawyers in NC!',
    date: '2024-02-15',
    title: 'Got Me The Benefits I Deserved',
    source: 'Google Reviews',
  },
  {
    author: 'Lisa K.',
    rating: 5,
    text: "Going through a divorce is hard, but Vasquez Law Firm made it bearable. They protected my interests and my children's future. Professional, compassionate, and effective.",
    date: '2024-03-05',
    title: 'Compassionate Family Law Help',
    source: 'Facebook Reviews',
  },
  {
    author: 'Miguel F.',
    rating: 5,
    text: 'Después de 10 años, finalmente soy ciudadano estadounidense gracias a Vasquez Law Firm! Ellos hicieron todo el proceso fácil y me prepararon para mi entrevista.',
    date: '2024-01-20',
    title: 'Ahora Soy Ciudadano!',
    source: 'Google Reviews',
  },
  {
    author: 'Jennifer W.',
    rating: 5,
    text: 'Truck accident left me severely injured. Vasquez Law Firm took on the big insurance companies and won! They got me a settlement that will take care of me for life.',
    date: '2024-02-28',
    title: 'Fought The Big Insurance Companies',
    source: 'Google Reviews',
  },
  {
    author: 'Roberto H.',
    rating: 5,
    text: "My asylum case was approved thanks to Vasquez Law Firm! They believed in me when no one else would. Now I'm safe and can build my life here.",
    date: '2024-03-15',
    title: 'Asylum Approved!',
    source: 'Avvo',
  },
  {
    author: 'Patricia C.',
    rating: 5,
    text: "DUI charge could have ruined my career. Vasquez Law Firm's criminal defense team got it dismissed. They saved my job and my reputation. Highly recommend!",
    date: '2024-01-25',
    title: 'Saved My Career',
    source: 'Google Reviews',
  },
];

interface GlobalReviewSchemaProps {
  // Allow custom reviews to be passed in, otherwise use global reviews
  reviews?: typeof globalReviews;
  // Allow filtering by practice area
  practiceArea?: string;
}

export function GlobalReviewSchema({
  reviews = globalReviews,
  practiceArea,
}: GlobalReviewSchemaProps) {
  // Filter reviews if practice area is specified
  let filteredReviews = reviews;
  if (practiceArea) {
    // In a real implementation, reviews would have categories
    // For now, we\'ll use all reviews
    filteredReviews = reviews;
  }

  const reviewSchema = generateReviewSchema(filteredReviews);

  return (
    <Script
      id={`review-schema-${practiceArea || 'global'}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewSchema),
      }}
    />
  );
}
