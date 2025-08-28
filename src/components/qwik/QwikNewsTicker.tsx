import React from 'react';

interface QwikNewsTickerProps {
  locale: 'en' | 'es';
}

export const QwikNewsTicker: React.FC<QwikNewsTickerProps> = ({ locale = 'en' }) => {
  const news = {
    en: [
      '🚨 NEW: Biden Immigration Program for Spouses - We Can Help! Call 1-844-YO-PELEO',
      "⚡ URGENT: DACA Renewals Processing - Don't Wait! Free Consultation Available",
      '🏆 $2.5M Settlement Won for Car Accident Client - We Fight For Maximum Compensation',
      '📍 Now Serving: Charlotte • Raleigh • Smithfield • Orlando - Se Habla Español',
      "🎯 Workers' Comp Claims: Don't Let Employers Deny Your Rights - We're Here 24/7",
    ],
    es: [
      '🚨 NUEVO: Programa de Biden para Cónyuges - ¡Podemos Ayudar! Llame 1-844-YO-PELEO',
      '⚡ URGENTE: Renovaciones DACA en Proceso - ¡No Espere! Consulta Gratis Disponible',
      '🏆 $2.5M Ganados para Cliente de Accidente - Luchamos por Compensación Máxima',
      '📍 Ahora en: Charlotte • Raleigh • Smithfield • Orlando - Hablamos Español',
      '🎯 Compensación Laboral: No Deje que le Nieguen sus Derechos - 24/7 Disponible',
    ],
  };

  const items = news[locale];

  return (
    <div className="w-full bg-secondary text-white overflow-hidden" style={{ height: '32px' }}>
      <div className="ticker-container h-full flex items-center">
        <div className="ticker-content flex whitespace-nowrap">
          {/* Duplicate items for seamless loop */}
          {[...items, ...items].map((item, index) => (
            <span key={index}

                className="ticker-item px-8 text-sm font-medium">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ticker-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        
        .ticker-content {
          animation: scroll-ticker 30s linear infinite;
        }
        
        .ticker-item {
          display: inline-block;
        }
        
        @keyframes scroll-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .ticker-content {
            animation: none;
          }
        }
      `,
        }}
      />
    </div>
  );
};
