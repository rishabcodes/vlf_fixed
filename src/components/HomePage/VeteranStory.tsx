'use client';

import React, { useRef } from 'react';

interface VeteranStoryProps {
  language: 'en' | 'es';
}

export default function VeteranStory({ language }: VeteranStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const content = {
    en: {
      badge: 'U.S. Air Force Veteran',
      title: 'From Military Service to Legal Excellence',
      subtitle: 'The Story Behind YO PELEO POR TI™',
      timeline: [
        {
          year: '1985',
          title: 'Enlisted in U.S. Air Force',
          description:
            'William Vasquez began his journey of service, learning discipline and dedication',
        },
        {
          year: '2001',
          title: 'Operation Enduring Freedom',
          description: 'Served as Spanish linguist, bridging cultures and protecting freedom',
        },
        {
          year: '1989',
          title: 'Founded Vasquez Law Firm',
          description: 'Brought military precision and fighting spirit to legal advocacy',
        },
        {
          year: '2024',
          title: '60+ Years of Fighting',
          description: 'Over 10,000 cases won, continuing the mission to protect and serve',
        },
      ],
      quote: {
        text: "In the Air Force, I learned that every mission matters. In law, every client's case is my mission.",
        author: 'William Vasquez, Founder',
      },
      values: [
        { icon: '🎖️', title: 'Honor', description: 'Military values guide every case' },
        { icon: '💪', title: 'Strength', description: 'Never backing down from a fight' },
        { icon: '🤝', title: 'Service', description: 'Clients first, always' },
        { icon: '🌟', title: 'Excellence', description: 'Precision in every detail' },
      ],
    },
    es: {
      badge: 'Veterano de la Fuerza Aérea de EE.UU.',
      title: 'Del Servicio Militar a la Excelencia Legal',
      subtitle: 'La Historia Detrás de YO PELEO POR TI™',
      timeline: [
        {
          year: '1985',
          title: 'Alistado en la Fuerza Aérea',
          description:
            'William Vasquez comenzó su viaje de servicio, aprendiendo disciplina y dedicación',
        },
        {
          year: '2001',
          title: 'Operación Libertad Duradera',
          description:
            'Sirvió como lingüista de español, uniendo culturas y protegiendo la libertad',
        },
        {
          year: '1989',
          title: 'Fundó Vasquez Law Firm',
          description: 'Trajo precisión militar y espíritu de lucha a la defensa legal',
        },
        {
          year: '2024',
          title: '60+ Años Luchando',
          description: 'Más de 10,000 casos ganados, continuando la misión de proteger y servir',
        },
      ],
      quote: {
        text: 'En la Fuerza Aérea, aprendí que cada misión importa. En derecho, el caso de cada cliente es mi misión.',
        author: 'William Vasquez, Fundador',
      },
      values: [
        { icon: '🎖️', title: 'Honor', description: 'Valores militares guían cada caso' },
        { icon: '💪', title: 'Fuerza', description: 'Nunca retroceder en una lucha' },
        { icon: '🤝', title: 'Servicio', description: 'Clientes primero, siempre' },
        { icon: '🌟', title: 'Excelencia', description: 'Precisión en cada detalle' },
      ],
    },
  };

  const t = content[language];

  return (
    <section
      ref={containerRef}

                className="relative overflow-hidden bg-mesh-dark py-24"
    >
      {/* Enhanced Parallax Background Elements with stronger brand colors */}
      <div className="absolute inset-0">
        <div className="gradient-orb-burgundy w-96 h-96 top-20 left-10 opacity-70 animate-float-orb" />
      </div>
      <div className="absolute inset-0">
        <div className="gradient-orb-gold w-80 h-80 bottom-20 right-10 opacity-60 animate-float-orb-reverse" />
      </div>
      <div className="absolute inset-0">
        <div className="gradient-orb-mixed w-72 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <span
className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#C9974D]/20 px-6 py-2 text-sm font-semibold text-[#C9974D] backdrop-blur-sm"
          >
            <span>🇺🇸</span>
            {t.badge}
          </span>

          <h2
className="mb-4 text-5xl font-black text-white md:text-6xl"
          >
            {t.title}
          </h2>

          <p
className="text-xl text-[#C9974D]"
          >
            {t.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.timeline.map((item, index) => (
            <div
              key={index}

                className="relative"
            >
              <div
                className="mb-4 text-4xl font-black text-[#C9974D]">{item.year}</div>
              <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>

              {index < t.timeline.length - 1 && (
                <div className="absolute top-8 left-full hidden h-0.5 w-full bg-gradient-to-r from-[#C9974D] to-transparent lg:block" />
              )}
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div
className="relative mb-20 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6B1F2E]/20 to-transparent p-12 text-center backdrop-blur-sm"
        >
          <div className="absolute -top-6 -left-6 text-8xl text-[#C9974D]/20">&quot;</div>
          <div className="absolute -bottom-6 -right-6 rotate-180 text-8xl text-[#C9974D]/20">
            &quot;
          </div>

          <blockquote className="relative z-10">
            <p className="mb-4 text-2xl font-medium italic text-white md:text-3xl">
              {t.quote.text}
            </p>
            <cite className="text-lg text-[#C9974D]">— {t.quote.author}</cite>
          </blockquote>
        </div>

        {/* Values Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.values.map((value, index) => (
            <div
              key={index}

                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div
                className="mb-4 text-4xl">{value.icon}</div>
              <h4 className="mb-2 text-xl font-bold text-white">{value.title}</h4>
              <p className="text-sm text-gray-400">{value.description}</p>

              {/* Hover effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#C9974D]/0 to-[#C9974D]/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Military Photo Placeholder */}
        <div
className="mt-16 flex justify-center"
        >
          <div className="relative h-96 w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#6B1F2E]/20 to-transparent">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-6xl">🎖️</div>
                <p className="text-xl font-bold text-white">William Vasquez</p>
                <p className="text-[#C9974D]">U.S. Air Force Veteran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
