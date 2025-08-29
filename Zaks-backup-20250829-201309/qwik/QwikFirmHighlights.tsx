import React from 'react';

interface QwikFirmHighlightsProps {
  language: 'en' | 'es';
}

interface Highlight {
  iconPath: string;
  title: string;
  description: string;
}

export const QwikFirmHighlights: React.FC<QwikFirmHighlightsProps> = ({ language = 'en' }) => {
  const content = {
    en: {
      title: 'Why Choose Vasquez Law Firm',
      subtitle: 'A Legacy of Fighting for Justice',
      highlights: [
        {
          iconPath:
            'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Shield
          title: 'Military Discipline',
          description: 'U.S. Air Force veteran bringing tactical precision to legal battles',
        },
        {
          iconPath:
            'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', // Users
          title: 'Bilingual Excellence',
          description: 'Fluent legal services in English and Spanish - Se Habla Español',
        },
        {
          iconPath:
            'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z', // Globe
          title: 'Immigration Expertise',
          description:
            'Helping families navigate complex immigration laws for 60+ years collective experience',
        },
        {
          iconPath:
            'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Award
          title: 'Proven Results',
          description:
            "Thousands of successful cases in personal injury, workers' comp, and criminal defense",
        },
        {
          iconPath:
            'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 0a12 12 0 1 1 0 24 12 12 0 0 1 0-24zM12 6v6l4 2', // Clock
          title: '24/7 Availability',
          description: "Round-the-clock support because legal emergencies don't wait",
        },
        {
          iconPath: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01M9 18v.01', // Building
          title: '4 Convenient Locations',
          description: 'Charlotte, Raleigh, Smithfield, and Orlando offices to serve you',
        },
      ],
    },
    es: {
      title: 'Por Qué Elegir Vasquez Law Firm',
      subtitle: 'Un Legado de Lucha por la Justicia',
      highlights: [
        {
          iconPath:
            'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Shield
          title: 'Disciplina Militar',
          description:
            'Veterano de la Fuerza Aérea de EE.UU. trayendo precisión táctica a batallas legales',
        },
        {
          iconPath:
            'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', // Users
          title: 'Excelencia Bilingüe',
          description: 'Servicios legales fluidos en inglés y español',
        },
        {
          iconPath:
            'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z', // Globe
          title: 'Expertos en Inmigración',
          description:
            'Ayudando a familias a navegar leyes de inmigración complejas por 60+ años de experiencia colectiva',
        },
        {
          iconPath:
            'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Award
          title: 'Resultados Comprobados',
          description:
            'Miles de casos exitosos en lesiones personales, compensación laboral y defensa criminal',
        },
        {
          iconPath:
            'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 0a12 12 0 1 1 0 24 12 12 0 0 1 0-24zM12 6v6l4 2', // Clock
          title: 'Disponible 24/7',
          description: 'Apoyo las 24 horas porque las emergencias legales no esperan',
        },
        {
          iconPath: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01M9 18v.01', // Building
          title: '4 Ubicaciones Convenientes',
          description: 'Oficinas en Charlotte, Raleigh, Smithfield y Orlando para servirle',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-[#C9974D]">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.highlights.map((highlight, index) => (
            <div
              key={index}

                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#6B1F2E]/10 to-[#C9974D]/10 border border-[#C9974D]/20 p-8 hover:border-[#C9974D]/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6B1F2E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-[#C9974D]/20">
                  <svg
                className="h-8 w-8 text-[#C9974D]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={highlight.iconPath} />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{highlight.title}</h3>
                <p className="text-gray-300">{highlight.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B1F2E] to-[#C9974D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#C9974D]/5 blur-3xl" />
      </div>
    </section>
  );
};
