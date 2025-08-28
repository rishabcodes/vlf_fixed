'use client';

import { Button } from '@/design-system/components/Button';
import { Phone, MessageCircle } from 'lucide-react';

export function GreenCardsClient() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        size="lg"
        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
        onClick={() => window.location.href = 'tel:1-844-967-3536'}
      >
        <Phone className="mr-2 h-5 w-5" />
        Call 1-844-YO-PELEO
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
        onClick={() => {
          const chatWidget = document.querySelector('chat-widget');
          if (chatWidget) {
            (chatWidget as any).open();
          }
        }}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Start Live Chat
      </Button>
    </div>
  );
}
