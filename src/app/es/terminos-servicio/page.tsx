import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Términos de Servicio | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Términos de Servicio del sitio web del Bufete de Abogados Vasquez y servicios legales.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/terminos-servicio',
    languages: {
      en: '/terms-of-service',
      es: '/es/terminos-servicio',
    },
  },
};

export default function TerminosServicioPage() {
  const post = {
    id: 'terminos-servicio',
    title: 'Términos de Servicio',
    slug: 'terminos-servicio',
    excerpt:
      'Términos y condiciones que rigen el uso del sitio web del Bufete de Abogados Vasquez y la relación con nuestros servicios legales.',
    content: `
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-600 mb-8">Última actualización: ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>Aceptación de los Términos</h2>
        
        <p>Bienvenido al sitio web del Bufete de Abogados Vasquez, PLLC ("nosotros", "nuestro" o "el Bufete"). Al acceder y utilizar este sitio web (www.vasquezlawnc.com), usted acepta estar sujeto a estos Términos de Servicio, nuestra Política de Privacidad y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestro sitio web.</p>
        
        <h2>Descripción de Servicios</h2>
        
        <p>El Bufete de Abogados Vasquez proporciona servicios legales en las siguientes áreas:</p>
        
        <ul>
          <li>Derecho de Inmigración</li>
          <li>Lesiones Personales</li>
          <li>Defensa Criminal</li>
          <li>Compensación Laboral</li>
          <li>Derecho de Familia</li>
          <li>Infracciones de Tránsito</li>
        </ul>
        
        <div className="bg-yellow-50 p-6 rounded-lg my-8">
          <p className="font-semibold mb-2">Aviso Importante:</p>
          <p>La información proporcionada en este sitio web es solo para fines informativos generales y no constituye asesoramiento legal. La comunicación a través de este sitio web no crea una relación abogado-cliente.</p>
        </div>
        
        <h2>Formación de la Relación Abogado-Cliente</h2>
        
        <p>Una relación abogado-cliente se forma únicamente cuando:</p>
        
        <ol>
          <li>Usted ha consultado con un abogado del Bufete sobre un asunto legal específico</li>
          <li>El Bufete ha realizado una verificación de conflictos de interés</li>
          <li>Ambas partes han firmado un acuerdo de representación por escrito</li>
          <li>Usted ha pagado cualquier anticipo requerido (si aplica)</li>
        </ol>
        
        <p>Hasta que se cumplan estas condiciones, cualquier información que nos proporcione no está protegida por el privilegio abogado-cliente.</p>
        
        <h2>Uso del Sitio Web</h2>
        
        <h3>Usos Permitidos</h3>
        
        <p>Usted puede utilizar este sitio web para:</p>
        
        <ul>
          <li>Obtener información general sobre nuestros servicios</li>
          <li>Leer contenido educativo sobre temas legales</li>
          <li>Contactarnos para programar una consulta</li>
          <li>Acceder a recursos y herramientas proporcionadas</li>
        </ul>
        
        <h3>Usos Prohibidos</h3>
        
        <p>Usted no debe:</p>
        
        <ul>
          <li>Usar el sitio de manera que viole cualquier ley aplicable</li>
          <li>Intentar acceder a áreas no autorizadas del sitio</li>
          <li>Interferir con el funcionamiento del sitio</li>
          <li>Recopilar información de otros usuarios</li>
          <li>Publicar contenido falso, difamatorio o que infrinja derechos de autor</li>
          <li>Usar el sitio para fines comerciales sin autorización</li>
        </ul>
        
        <h2>Propiedad Intelectual</h2>
        
        <p>Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad del Bufete de Abogados Vasquez o sus licenciantes y está protegido por las leyes de derechos de autor y propiedad intelectual.</p>
        
        <p>El lema "YO PELEO POR TI™" es una marca registrada del Bufete de Abogados Vasquez.</p>
        
        <h2>Limitaciones de Responsabilidad</h2>
        
        <p>En la máxima medida permitida por la ley:</p>
        
        <ul>
          <li>El Bufete no será responsable por daños indirectos, incidentales, especiales o consecuentes</li>
          <li>El Bufete no garantiza que el sitio web estará disponible ininterrumpidamente o libre de errores</li>
          <li>El Bufete no es responsable por la precisión o confiabilidad de la información en el sitio</li>
        </ul>
        
        <h2>Indemnización</h2>
        
        <p>Usted acepta indemnizar y eximir de responsabilidad al Bufete, sus abogados, empleados y agentes de cualquier reclamo, daño, pérdida o gasto (incluyendo honorarios legales razonables) que surjan de su uso del sitio web o violación de estos términos.</p>
        
        <h2>Enlaces a Terceros</h2>
        
        <p>Nuestro sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan solo para su conveniencia. No respaldamos ni asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web de terceros.</p>
        
        <h2>Modificaciones</h2>
        
        <p>Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. Su uso continuado del sitio después de dichos cambios constituye su aceptación de los nuevos términos.</p>
        
        <h2>Ley Aplicable</h2>
        
        <p>Estos Términos de Servicio se rigen por las leyes del Estado de Carolina del Norte, sin tener en cuenta sus disposiciones sobre conflicto de leyes. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Carolina del Norte.</p>
        
        <h2>Divisibilidad</h2>
        
        <p>Si alguna disposición de estos términos se considera inválida o inaplicable, las disposiciones restantes continuarán en pleno vigor y efecto.</p>
        
        <h2>Comunicaciones Electrónicas</h2>
        
        <p>Al utilizar nuestro sitio web y servicios, usted consiente recibir comunicaciones electrónicas de nosotros. Estas comunicaciones pueden incluir avisos sobre su cuenta, actualizaciones legales y otra información relacionada con nuestros servicios.</p>
        
        <h2>Descargo de Responsabilidad sobre Resultados</h2>
        
        <p>Los resultados de casos anteriores no garantizan o predicen un resultado similar en casos futuros. Cada caso legal es único y debe evaluarse según sus propios méritos.</p>
        
        <h2>Información de Contacto</h2>
        
        <p>Si tiene preguntas sobre estos Términos de Servicio, contáctenos:</p>
        
        <div className="bg-gray-50 p-6 rounded-lg my-8">
          <p><strong>Bufete de Abogados Vasquez, PLLC</strong></p>
          <p>6842 Fairview Rd, Charlotte, NC 28210</p>
          <p>Teléfono: <a href="tel:+19193781525">(919) 378-1525</a></p>
          <p>Correo: <a href="mailto:info@vasquezlawnc.com">info@vasquezlawnc.com</a></p>
        </div>
        
        <h2>Reconocimiento</h2>
        
        <p>AL UTILIZAR ESTE SITIO WEB, USTED RECONOCE QUE HA LEÍDO, ENTENDIDO Y ACEPTA ESTAR SUJETO A ESTOS TÉRMINOS DE SERVICIO.</p>
      </div>
    `,
    practiceArea: 'general',
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 12,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['términos legales', 'condiciones de uso', 'políticas'],
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
