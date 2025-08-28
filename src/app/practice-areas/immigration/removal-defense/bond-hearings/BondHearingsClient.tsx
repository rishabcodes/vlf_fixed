'use client';

import { Button } from '@/components/ui/button';

export function BondHearingsClient() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
        onClick={() => window.location.href = 'tel:1-844-967-3536'}
      >
        CALL NOW: 1-844-YO-PELEO
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-bold px-8 py-4 rounded-lg transition-all"
        onClick={() => window.location.href = '/contact'}
      >
        Emergency Contact Form
      </Button>
    </div>
  );
}
