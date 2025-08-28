import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Política de Privacidad del Bufete de Abogados Vasquez. Conozca cómo recopilamos, usamos y protegemos su información personal.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/politica-privacidad',
    languages: {
      en: '/privacy-policy',
      es: '/es/politica-privacidad',
    },
  },
};

export default function PoliticaPrivacidadPage() {
  const post = {
    id: 'politica-privacidad',
    title: 'Política de Privacidad',
    slug: 'politica-privacidad',
    excerpt:
      'Conozca cómo el Bufete de Abogados Vasquez protege su privacidad y maneja su información personal de manera segura y confidencial.',
    content: `
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-600 mb-8">Última actualización: ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>Introducción</h2>
        
        <p>En el Bufete de Abogados Vasquez, PLLC ("nosotros", "nuestro" o "el Bufete"), valoramos y respetamos su privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos, divulgamos y protegemos su información personal cuando utiliza nuestro sitio web o nuestros servicios legales.</p>
        
        <h2>Información que Recopilamos</h2>
        
        <h3>Información que Usted Proporciona</h3>
        
        <p>Podemos recopilar información que usted nos proporciona directamente, incluyendo:</p>
        
        <ul>
          <li>Nombre completo y información de contacto (dirección, teléfono, correo electrónico)</li>
          <li>Fecha de nacimiento y número de Seguro Social (cuando sea necesario para representación legal)</li>
          <li>Información sobre su caso legal y documentos relacionados</li>
          <li>Información de inmigración y estado legal</li>
          <li>Información médica (en casos de lesiones personales o compensación laboral)</li>
          <li>Información financiera (cuando sea relevante para su caso)</li>
          <li>Comunicaciones con nosotros a través de correo electrónico, teléfono o formularios en línea</li>
        </ul>
        
        <h3>Información Recopilada Automáticamente</h3>
        
        <p>Cuando visita nuestro sitio web, podemos recopilar automáticamente:</p>
        
        <ul>
          <li>Dirección IP y ubicación geográfica general</li>
          <li>Tipo de navegador y dispositivo</li>
          <li>Páginas visitadas y tiempo en el sitio</li>
          <li>Sitio web de referencia</li>
          <li>Información recopilada a través de cookies y tecnologías similares</li>
        </ul>
        
        <h2>Cómo Usamos Su Información</h2>
        
        <p>Utilizamos su información personal para:</p>
        
        <ul>
          <li><strong>Proporcionar servicios legales:</strong> Representarlo en asuntos legales y comunicarnos sobre su caso</li>
          <li><strong>Cumplir con obligaciones legales:</strong> Cumplir con leyes, regulaciones y órdenes judiciales</li>
          <li><strong>Mejorar nuestros servicios:</strong> Entender mejor las necesidades de nuestros clientes</li>
          <li><strong>Comunicaciones:</strong> Enviarle actualizaciones sobre su caso, boletines informativos (con su consentimiento) y responder a sus consultas</li>
          <li><strong>Protección:</strong> Prevenir fraude y proteger nuestros derechos legales</li>
        </ul>
        
        <h2>Confidencialidad Abogado-Cliente</h2>
        
        <div className="bg-blue-50 p-6 rounded-lg my-8">
          <p className="font-semibold mb-2">Privilegio Abogado-Cliente:</p>
          <p>La información compartida con nosotros en el contexto de una relación abogado-cliente está protegida por el privilegio abogado-cliente. Mantenemos la más estricta confidencialidad de acuerdo con las reglas profesionales de conducta y las leyes aplicables.</p>
        </div>
        
        <h2>Divulgación de Información</h2>
        
        <p>No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en las siguientes circunstancias:</p>
        
        <ul>
          <li><strong>Con su consentimiento:</strong> Cuando usted nos autoriza expresamente</li>
          <li><strong>Para representación legal:</strong> Con tribunales, agencias gubernamentales y otras partes según sea necesario para su caso</li>
          <li><strong>Proveedores de servicios:</strong> Con proveedores que nos ayudan a operar nuestro negocio (bajo acuerdos de confidencialidad)</li>
          <li><strong>Requisitos legales:</strong> Cuando la ley lo requiera o para responder a procesos legales</li>
          <li><strong>Protección de derechos:</strong> Para proteger los derechos, propiedad o seguridad del Bufete, nuestros clientes u otros</li>
        </ul>
        
        <h2>Seguridad de Datos</h2>
        
        <p>Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger su información personal contra acceso no autorizado, divulgación, alteración o destrucción. Estas medidas incluyen:</p>
        
        <ul>
          <li>Encriptación de datos sensibles</li>
          <li>Acceso restringido a información personal</li>
          <li>Capacitación regular del personal sobre privacidad y seguridad</li>
          <li>Auditorías de seguridad periódicas</li>
          <li>Políticas de retención y destrucción segura de documentos</li>
        </ul>
        
        <h2>Sus Derechos</h2>
        
        <p>Usted tiene derecho a:</p>
        
        <ul>
          <li><strong>Acceder:</strong> Solicitar información sobre los datos personales que tenemos sobre usted</li>
          <li><strong>Corregir:</strong> Solicitar correcciones a información inexacta o incompleta</li>
          <li><strong>Eliminar:</strong> Solicitar la eliminación de su información (sujeto a obligaciones legales)</li>
          <li><strong>Optar por no recibir:</strong> Cancelar suscripción a comunicaciones de marketing</li>
          <li><strong>Portabilidad:</strong> Recibir una copia de su información en formato electrónico</li>
        </ul>
        
        <h2>Cookies y Tecnologías de Seguimiento</h2>
        
        <p>Nuestro sitio web utiliza cookies y tecnologías similares para:</p>
        
        <ul>
          <li>Recordar sus preferencias</li>
          <li>Entender cómo utiliza nuestro sitio</li>
          <li>Mejorar su experiencia de navegación</li>
          <li>Proporcionar contenido relevante</li>
        </ul>
        
        <p>Puede controlar las cookies a través de la configuración de su navegador, aunque deshabilitarlas puede afectar la funcionalidad del sitio.</p>
        
        <h2>Enlaces a Terceros</h2>
        
        <p>Nuestro sitio web puede contener enlaces a sitios de terceros. No somos responsables de las prácticas de privacidad de estos sitios. Le recomendamos revisar las políticas de privacidad de cualquier sitio que visite.</p>
        
        <h2>Privacidad de Menores</h2>
        
        <p>Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente información personal de menores sin el consentimiento de los padres o tutores legales.</p>
        
        <h2>Cambios a Esta Política</h2>
        
        <p>Podemos actualizar esta Política de Privacidad periódicamente. Los cambios entrarán en vigor cuando publiquemos la política revisada en nuestro sitio web. La fecha de la última actualización se indicará al principio de esta política.</p>
        
        <h2>Contáctenos</h2>
        
        <p>Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos su información personal, contáctenos:</p>
        
        <div className="bg-gray-50 p-6 rounded-lg my-8">
          <p><strong>Bufete de Abogados Vasquez, PLLC</strong></p>
          <p>6842 Fairview Rd, Charlotte, NC 28210</p>
          <p>Teléfono: <a href="tel:+19193781525">(919) 378-1525</a></p>
          <p>Correo: <a href="mailto:privacy@vasquezlawnc.com">privacy@vasquezlawnc.com</a></p>
        </div>
        
        <h2>Leyes Aplicables</h2>
        
        <p>Esta Política de Privacidad se rige por las leyes del Estado de Carolina del Norte y las leyes federales aplicables de los Estados Unidos.</p>
      </div>
    `,
    practiceArea: 'general',
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 10,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['privacidad', 'legal', 'protección de datos'],
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
