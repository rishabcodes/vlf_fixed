import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Resultados de Casos | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Vea nuestros resultados exitosos de casos en inmigración, lesiones personales, defensa criminal y compensación laboral. Victorias reales para clientes reales.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/resultados-casos',
    languages: {
      en: '/case-results',
      es: '/es/resultados-casos',
    },
  },
};

export default function ResultadosCasosPage() {
  const post = {
    id: 'resultados-casos',
    title: 'Resultados de Casos',
    slug: 'resultados-casos',
    excerpt:
      'Vea nuestros resultados exitosos representando a clientes en casos de inmigración, lesiones personales, defensa criminal y compensación laboral.',
    content: `
      <div className="prose prose-lg max-w-none">
        <h2>Victorias Reales para Clientes Reales</h2>
        
        <p>En el Bufete de Abogados Vasquez, PLLC, medimos nuestro éxito por los resultados que obtenemos para nuestros clientes. Con más de 30,000 casos exitosos, hemos ayudado a miles de familias a superar sus desafíos legales más difíciles.</p>
        
        <h3>Resultados Destacados por Área de Práctica</h3>
        
        <h4>Casos de Inmigración</h4>
        
        <ul>
          <li><strong>$2.5 millones</strong> - Demanda colectiva por retrasos en procesamiento de USCIS</li>
          <li><strong>Asilo aprobado</strong> - Familia venezolana enfrentando persecución política</li>
          <li><strong>Cancelación de deportación</strong> - Madre de tres ciudadanos estadounidenses</li>
          <li><strong>Residencia permanente</strong> - Víctima de violencia doméstica bajo VAWA</li>
          <li><strong>Visa U aprobada</strong> - Víctima de crimen violento colaborando con autoridades</li>
        </ul>
        
        <h4>Lesiones Personales</h4>
        
        <ul>
          <li><strong>$3.2 millones</strong> - Accidente de camión comercial con lesiones graves</li>
          <li><strong>$1.8 millones</strong> - Negligencia médica resultando en daño permanente</li>
          <li><strong>$950,000</strong> - Accidente de motocicleta causado por conductor ebrio</li>
          <li><strong>$750,000</strong> - Resbalón y caída en propiedad comercial mal mantenida</li>
          <li><strong>$500,000</strong> - Mordedura de perro causando desfiguración facial</li>
        </ul>
        
        <h4>Defensa Criminal</h4>
        
        <ul>
          <li><strong>Caso desestimado</strong> - Cargos de DUI por evidencia inadmisible</li>
          <li><strong>No culpable</strong> - Defensa exitosa en caso de asalto agravado</li>
          <li><strong>Reducción de cargos</strong> - Felonía reducida a delito menor</li>
          <li><strong>Libertad condicional</strong> - Evitamos tiempo en prisión para cliente primerizo</li>
          <li><strong>Expunción exitosa</strong> - Limpieza de antecedentes penales</li>
        </ul>
        
        <h4>Compensación Laboral</h4>
        
        <ul>
          <li><strong>$425,000</strong> - Lesión de espalda en sitio de construcción</li>
          <li><strong>$350,000</strong> - Enfermedad ocupacional por exposición química</li>
          <li><strong>$275,000</strong> - Lesión por esfuerzo repetitivo en fábrica</li>
          <li><strong>Beneficios de por vida</strong> - Incapacidad total permanente</li>
          <li><strong>Tratamiento médico continuo</strong> - Para múltiples condiciones laborales</li>
        </ul>
        
        <h3>Lo Que Dicen Nuestros Clientes</h3>
        
        <blockquote className="border-l-4 border-blue-500 pl-4 my-6">
          <p>"El equipo de Vasquez Law Firm luchó incansablemente por mi familia. Después de años de incertidumbre, finalmente tenemos nuestras tarjetas verdes. ¡No hay palabras para expresar nuestra gratitud!"</p>
          <footer className="text-sm text-gray-600 mt-2">- María G., Cliente de Inmigración</footer>
        </blockquote>
        
        <blockquote className="border-l-4 border-blue-500 pl-4 my-6">
          <p>"Después de mi accidente, no sabía cómo pagaría mis facturas médicas. William y su equipo obtuvieron una compensación que superó mis expectativas. Verdaderamente pelean por ti."</p>
          <footer className="text-sm text-gray-600 mt-2">- Roberto M., Cliente de Lesiones Personales</footer>
        </blockquote>
        
        <h3>Factores Importantes a Considerar</h3>
        
        <div className="bg-yellow-50 p-6 rounded-lg my-8">
          <p className="font-semibold mb-2">Nota Legal:</p>
          <p>Los resultados anteriores no garantizan resultados similares en casos futuros. Cada caso es único y debe evaluarse según sus propios méritos. Los montos de compensación mostrados son brutos y no reflejan honorarios legales o costos.</p>
        </div>
        
        <h3>¿Por Qué Elegir Vasquez Law Firm?</h3>
        
        <ul>
          <li><strong>Experiencia comprobada:</strong> Más de 15 años representando a la comunidad hispana</li>
          <li><strong>Comunicación en español:</strong> Todo nuestro equipo habla español fluido</li>
          <li><strong>Sin honorarios por adelantado:</strong> En casos de lesiones, solo cobramos si ganamos</li>
          <li><strong>Disponibles 24/7:</strong> Estamos aquí cuando más nos necesita</li>
          <li><strong>Múltiples oficinas:</strong> Convenientes ubicaciones en Carolina del Norte y Florida</li>
        </ul>
        
        <h3>Comience Su Caso Hoy</h3>
        
        <p>Si enfrenta un desafío legal, no espere. Nuestro historial habla por sí mismo, pero lo más importante es cómo podemos ayudarle a usted. Llame al <a href="tel:+19193781525">(919) 378-1525</a> para una consulta gratuita y descubra cómo podemos luchar por sus derechos.</p>
        
        <p className="mt-8 text-center">
          <strong>YO PELEO POR TI™</strong> - No es solo un lema, es nuestra promesa.
        </p>
      </div>
    `,
    practiceArea: 'general',
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 8,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['resultados', 'casos exitosos', 'testimonios'],
  };

  const categories = [
    {
      id: 'immigration',
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
  ];

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={[]} // TODO: Add related posts
    />
  );
}
